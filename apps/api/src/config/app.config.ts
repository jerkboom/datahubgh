import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  uri: process.env.MONGODB_URI,
}));

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
}));

export const paystackConfig = registerAs('paystack', () => ({
  secretKey: process.env.PAYSTACK_SECRET_KEY,
  publicKey: process.env.PAYSTACK_PUBLIC_KEY,
}));

export const korapayConfig = registerAs('korapay', () => ({
  secretKey: process.env.KORAPAY_SECRET_KEY,
  publicKey: process.env.KORAPAY_PUBLIC_KEY,
}));

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '4000', 10),
  frontendUrl: process.env.FRONTEND_URL,
  environment: process.env.NODE_ENV || 'development',
  activePaymentGateway: process.env.PAYMENT_GATEWAY || 'paystack',
}));
