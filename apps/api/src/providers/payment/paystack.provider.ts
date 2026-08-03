import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from '../../core/contracts/providers.interface';
import { PaymentResponse, TransactionData } from '../../core/types';
import { PaymentStatus } from '../../core/enums';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaystackProvider implements PaymentProvider {
  private readonly secretKey: string;
  private readonly baseUrl = 'https://api.paystack.co';
  private readonly logger = new Logger(PaystackProvider.name);

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  async initializePayment(amount: number, reference: string, customerDetails: any): Promise<PaymentResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          amount: amount * 100, // Paystack works in kobo/pesewas
          email: customerDetails.email || 'guest@datahubgh.com',
          reference,
          metadata: customerDetails.metadata || {},
          callback_url: `${this.configService.get<string>('NEXT_PUBLIC_APP_URL') || this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000'}/success`,
        },
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        reference,
        authorizationUrl: response.data.data.authorization_url,
        status: PaymentStatus.PENDING,
        message: 'Payment initialized successfully',
      };
    } catch (error: any) {
      this.logger.error('Paystack initialization failed', error.response?.data || error.message);
      return {
        success: false,
        reference,
        authorizationUrl: '',
        status: PaymentStatus.FAILED,
        message: error.response?.data?.message || 'Initialization failed',
      };
    }
  }

  async verifyPayment(reference: string): Promise<PaymentResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      });

      const data = response.data.data;
      const isSuccess = data.status === 'success';

      return {
        success: isSuccess,
        reference,
        status: isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
        message: data.gateway_response || 'Verification completed',
        amount: data.amount,
        metadata: data.metadata,
      };
    } catch (error: any) {
      this.logger.error('Paystack verification failed', error.response?.data || error.message);
      return {
        success: false,
        reference,
        status: PaymentStatus.FAILED,
        message: 'Verification failed',
      };
    }
  }

  verifyWebhook(signature: string, payload: any): boolean {
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    return hash === signature;
  }

  async refundPayment(reference: string): Promise<boolean> {
    return false; // Not implemented for this mock
  }

  async getTransaction(reference: string): Promise<TransactionData | null> {
    return null;
  }
}
