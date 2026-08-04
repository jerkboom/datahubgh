import { OrderStatus, PaymentStatus, DeliveryStatus } from '../enums';

export interface PaymentResponse {
  success: boolean;
  reference: string;
  authorizationUrl?: string;
  accessCode?: string;
  publicKey?: string;
  email?: string;
  status: PaymentStatus;
  message: string;
  amount?: number;
  metadata?: any;
}

export interface DeliveryResponse {
  success: boolean;
  deliveryId: string;
  status: DeliveryStatus;
  message: string;
}

export interface TransactionData {
  reference: string;
  amount: number;
  status: PaymentStatus;
  channel: string;
  paidAt: Date;
}

export interface OrderSummary {
  orderReference: string;
  bundleId: string;
  recipientPhone: string;
  amount: number;
  status: OrderStatus;
  createdAt: Date;
}
