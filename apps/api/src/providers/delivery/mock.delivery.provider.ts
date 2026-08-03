import { Injectable } from '@nestjs/common';
import { DeliveryProvider } from '../../core/contracts/providers.interface';
import { DeliveryResponse } from '../../core/types';
import { DeliveryStatus } from '../../core/enums';

@Injectable()
export class MockDeliveryProvider implements DeliveryProvider {
  async deliver(bundleId: string, recipientPhone: string): Promise<DeliveryResponse> {
    // Simulating API call to telecom provider
    return {
      success: true,
      deliveryId: `DEL-${Date.now()}`,
      status: DeliveryStatus.DELIVERED,
      message: 'Bundle delivered successfully via Mock Vendor',
    };
  }

  async retry(deliveryId: string): Promise<DeliveryResponse> {
    return {
      success: true,
      deliveryId,
      status: DeliveryStatus.DELIVERED,
      message: 'Retry successful',
    };
  }

  async checkStatus(deliveryId: string): Promise<DeliveryResponse> {
    return {
      success: true,
      deliveryId,
      status: DeliveryStatus.DELIVERED,
      message: 'Delivery confirmed',
    };
  }

  async cancel(deliveryId: string): Promise<boolean> {
    return true;
  }
}
