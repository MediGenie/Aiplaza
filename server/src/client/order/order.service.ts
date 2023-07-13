import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/database/payment-data/payment.repository';

@Injectable()
export class OrderService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  readyOrder(service_id: string, user_id: string) {
    return this.paymentRepository.orderReady(service_id, user_id);
  }
}
