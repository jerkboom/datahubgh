import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentInitializationException extends HttpException {
  constructor(message: string = 'Failed to initialize payment') {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}

export class PaymentVerificationException extends HttpException {
  constructor(message: string = 'Payment verification failed') {
    super(message, HttpStatus.PAYMENT_REQUIRED);
  }
}

export class DeliveryException extends HttpException {
  constructor(message: string = 'Bundle delivery failed') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class OrderNotFoundException extends HttpException {
  constructor(message: string = 'Order not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class InvalidBundleException extends HttpException {
  constructor(message: string = 'The requested bundle is invalid or inactive') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class NetworkUnavailableException extends HttpException {
  constructor(message: string = 'The selected network is currently unavailable') {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class DuplicateOrderException extends HttpException {
  constructor(message: string = 'An order with this reference already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}
