import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true, index: true })
  orderReference: string;

  @Prop({ type: String, required: true })
  bundleId: string;

  @Prop({ required: true })
  recipientPhone: string;

  @Prop({ required: false })
  customerName?: string;

  @Prop({ required: false })
  customerPhone?: string;

  // Optional link to a registered user
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false })
  userId?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ required: true, index: true })
  paymentReference: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
