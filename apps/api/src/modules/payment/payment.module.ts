import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaystackProvider } from '../../providers/payment/paystack.provider';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PaymentProvider',
      useClass: PaystackProvider,
    },
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
