import { PaymentResponse, DeliveryResponse, TransactionData } from '../types';

export interface PaymentProvider {
  initializePayment(amount: number, reference: string, customerDetails: any): Promise<PaymentResponse>;
  verifyPayment(reference: string): Promise<PaymentResponse>;
  verifyWebhook(signature: string, payload: any): boolean;
  refundPayment(reference: string): Promise<boolean>;
  getTransaction(reference: string): Promise<TransactionData | null>;
}

export interface DeliveryProvider {
  deliver(bundleId: string, recipientPhone: string): Promise<DeliveryResponse>;
  retry(deliveryId: string): Promise<DeliveryResponse>;
  checkStatus(deliveryId: string): Promise<DeliveryResponse>;
  cancel(deliveryId: string): Promise<boolean>;
}

export interface ApplicationLogger {
  log(message: string, context?: string): void;
  error(message: string, trace?: string, context?: string): void;
  warn(message: string, context?: string): void;
  debug(message: string, context?: string): void;
}
