import { Controller, Post, Get, Body, Param, Headers, HttpCode, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { normalizePhone } from '../../common/utils/phone.util';

export class InitializePaymentDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  recipientPhone?: string;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  promoCode?: string;

  @IsOptional()
  @IsString()
  bundleId?: string;

  @IsOptional()
  @IsString()
  networkId?: string;

  @IsOptional()
  @IsString()
  deliveryMode?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('paystack/initialize')
  async initializePayment(@Body() body: InitializePaymentDto, @Request() req: any) {
    let email = body.email;
    
    // 1. Use authenticated user's email if available
    if (req.user && req.user.email) {
      email = req.user.email;
    }
    
    // 2. Fallback to generating unique email from phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const phone = body.recipientPhone || '';
      const normalizedPhone = normalizePhone(phone);
      email = normalizedPhone ? `${normalizedPhone}@datahubgh.com` : 'guest@datahubgh.com';
    }

    return this.paymentService.initializePayment(
      body.amount, 
      email,
      body.bundleId || '',
      body.recipientPhone || ''
    );
  }

  @Get('paystack/verify/:reference')
  async verifyPayment(@Param('reference') reference: string) {
    return this.paymentService.verifyTransaction(reference);
  }

  @Post('paystack/webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Body() payload: any,
    @Request() req: any
  ) {
    const rawBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(payload);
    return this.paymentService.handleWebhook(signature, payload, rawBody);
  }
}
