import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';
import { normalizePhone } from '../../common/utils/phone.util';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async createOrder(data: any): Promise<OrderDocument> {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async updateOrderStatus(reference: string, status: OrderStatus): Promise<OrderDocument | null> {
    return this.orderModel.findOneAndUpdate(
      { orderReference: reference },
      { status },
      { new: true }
    );
  }

  async getOrder(reference: string): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ orderReference: reference });
  }

  async trackOrder(query: string): Promise<OrderDocument | null> {
    const normalizedPhone = normalizePhone(query);
    return this.orderModel.findOne({
      $or: [
        { orderReference: query },
        { paymentReference: query },
        { paystackReference: query },
        { paystackTransactionId: query },
        { recipientPhone: normalizedPhone },
      ]
    });
  }
}
