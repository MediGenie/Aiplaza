import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/database/payment-data/payment.repository';
import {
  PaymentDocument,
  PaymentStatus,
} from 'src/database/schema/payment.schema';
import { IamportService } from 'src/iamport/iamport.service';

@Injectable()
export class OrderHooksService {
  constructor(
    private paymentRepository: PaymentRepository,
    private readonly iamportService: IamportService,
  ) {}

  private verifyPaymentBeforeOrderComplete(
    payment: PaymentDocument,
    amount: number,
  ) {
    if (!payment) {
      throw new BadRequestException(
        'MID가 일치하는 결제정보가 존재하지 않습니다.',
      );
    }
    if (payment.amount !== amount) {
      throw new BadRequestException('결제 금액이 일치하지 않습니다.');
    }
    if (payment.status !== PaymentStatus.READY) {
      throw new BadRequestException('이미 처리된 결제 정보 입니다.');
    }
  }

  async handlePaid(imp_uid: string) {
    const payment_info = await this.iamportService.getPaymentData(imp_uid);
    // status, method, canceled_at, payment_at;
    const { pay_method, paid_at, amount, merchant_uid } = payment_info;
    const stored_payment = await this.paymentRepository.getPaymentFromMid(
      merchant_uid,
    );
    try {
      this.verifyPaymentBeforeOrderComplete(stored_payment, amount);
      const payment_at = new Date(paid_at * 1000);
      await this.paymentRepository.orderComplete({
        payment_id: stored_payment._id,
        imp_uid: imp_uid,
        method: pay_method,
        payment_at,
      });
    } catch (e) {
      throw e;
    }
  }

  handleCancel(imp_uid: string) {
    // 훅은 존재하지 않을 것이다.
  }
}
