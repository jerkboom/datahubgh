import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('track/:query')
  async trackOrder(@Param('query') query: string) {
    const order = await this.ordersService.trackOrder(query);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    
    // Simulate some realistic backend details if missing
    let deliveryStatus = 'PENDING';
    if (order.status === 'COMPLETED') {
      const updatedAt = order.get ? order.get('updatedAt') : order['updatedAt'];
      const createdAt = order.get ? order.get('createdAt') : order['createdAt'];
      const timeDiff = Date.now() - new Date(updatedAt || createdAt).getTime();
      if (timeDiff < 2 * 60 * 1000) {
        deliveryStatus = 'PROCESSING';
      } else if (timeDiff < 3 * 60 * 1000) {
        deliveryStatus = 'SENDING';
      } else {
        deliveryStatus = 'DELIVERED';
      }
    } else if (order.status === 'FAILED') {
      deliveryStatus = 'FAILED';
    }

    return {
      success: true,
      orderReference: order.orderReference,
      paymentReference: order.paymentReference,
      status: order.status,
      deliveryStatus,
      customerName: order.customerName || 'Customer',
      recipientPhone: order.recipientPhone,
      bundleId: order.bundleId,
      amount: order.amount,
      createdAt: order['createdAt'],
      paymentMethod: 'Mobile Money',
      deliveryType: 'Priority',
      validity: 'Non-Expiry',
    };
  }
}
