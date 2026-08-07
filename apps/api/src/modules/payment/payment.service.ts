import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { PaymentProvider } from '../../core/contracts/providers.interface';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/schemas/order.schema';
import { PaymentStatus } from '../../core/enums';
import { normalizePhone } from '../../common/utils/phone.util';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentProvider') private readonly paymentProvider: PaymentProvider,
    private readonly ordersService: OrdersService,
  ) {}

  async initializePayment(amount: number, customerEmail: string, bundleId: string, recipientPhone: string) {
    const reference = `ORD-${randomUUID()}`;
    
    // Create an order in DB
    await this.ordersService.createOrder({
      orderReference: reference,
      bundleId: bundleId || 'unknown-bundle',
      recipientPhone: normalizePhone(recipientPhone || '0000000000'),
      amount,
      paymentReference: reference,
      paymentProvider: 'paystack',
      status: OrderStatus.PENDING,
    });

    const response = await this.paymentProvider.initializePayment(amount, reference, { 
      email: customerEmail,
      metadata: { bundleId, recipientPhone: normalizePhone(recipientPhone || '0000000000') }
    });

    if (!response.success) {
      throw new BadRequestException(response.message || 'Payment initialization failed');
    }

    return response;
  }

  async verifyTransaction(reference: string) {
    const response = await this.paymentProvider.verifyPayment(reference);
    let order = await this.ordersService.getOrder(reference);

    if (response.success && !order) {
      const metadata = response.metadata || {};
      order = await this.ordersService.createOrder({
        orderReference: reference,
        bundleId: metadata.bundleId || 'unknown-bundle',
        recipientPhone: metadata.recipientPhone || '0000000000',
        amount: response.amount ? response.amount / 100 : 0,
        paymentReference: reference,
        paymentProvider: 'paystack',
        status: OrderStatus.COMPLETED,
      });
    }

    if (response.status === PaymentStatus.SUCCESS && order?.status !== OrderStatus.COMPLETED) {
      order = await this.ordersService.updateOrderStatus(reference, OrderStatus.COMPLETED);
    }
    
    let deliveryStatus = 'PENDING';
    if (order?.status === OrderStatus.COMPLETED) {
      const updatedAt = order.get ? order.get('updatedAt') : (order as any).updatedAt;
      const createdAt = order.get ? order.get('createdAt') : (order as any).createdAt;
      const timeDiff = Date.now() - new Date(updatedAt || createdAt).getTime();
      if (timeDiff < 2 * 60 * 1000) {
        deliveryStatus = 'PROCESSING';
      } else if (timeDiff < 3 * 60 * 1000) {
        deliveryStatus = 'SENDING';
      } else {
        deliveryStatus = 'DELIVERED';
      }
    }

    return {
      success: response.status === PaymentStatus.SUCCESS || order?.status === OrderStatus.COMPLETED,
      status: order?.status || response.status,
      amount: order?.amount || 0,
      recipientPhone: order?.recipientPhone || 'N/A',
      bundleId: order?.bundleId || 'Data Bundle',
      paymentReference: order?.paymentReference || reference,
      paymentMethod: 'Mobile Money',
      deliveryStatus,
      createdAt: (order as any)?.createdAt || new Date(),
    };
  }

  async handleWebhook(signature: string, payload: any, rawBody: string) {
    const isValid = this.paymentProvider.verifyWebhook(signature, rawBody);
    if (!isValid) throw new BadRequestException('Invalid signature');

    if (payload.event === 'charge.success') {
      await this.ordersService.updateOrderStatus(payload.data.reference, OrderStatus.COMPLETED);
    }
    return { success: true };
  }
}
