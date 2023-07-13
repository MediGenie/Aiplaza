import { Body, Controller, Post } from '@nestjs/common';
import { PaymentRepository } from 'src/database/payment-data/payment.repository';
import { Payment, PaymentStatus } from 'src/database/schema/payment.schema';
import { OrderHooksService } from './order-hooks.service';

@Controller('hooks/order')
export class OrderHooksController {
  constructor(private readonly orderHooksService: OrderHooksService) {}
  @Post()
  handleHooks(
    @Body()
    body: {
      imp_uid: string;
      merchant_uid: string;
      status: PaymentStatus;
    },
  ) {
    if (body.status === PaymentStatus.READY) {
      return 'good';
    }
    if (body.status === PaymentStatus.PAID) {
      return this.orderHooksService.handlePaid(body.imp_uid);
    }
    if (body.status === PaymentStatus.CANCEL) {
      return this.orderHooksService.handleCancel(body.imp_uid);
    }
    if (body.status === PaymentStatus.FAILED) {
      return 'good';
    }
    return 'good';
  }
}
