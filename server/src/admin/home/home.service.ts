import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/database/account-data/account.repository';
import { PaymentRepository } from 'src/database/payment-data/payment.repository';
import { AccountStatus, AccountType } from 'src/database/schema/account.schema';
import { ServiceRepository } from 'src/database/service-data/service.repository';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment-timezone');

@Injectable()
export class HomeService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}
  async getList() {
    const providerNum = await this.accountRepository.getCount({
      type: AccountType.PROVIDER,
      status: AccountStatus.GRANT,
    });
    const customerNum = await this.accountRepository.getCount({
      type: AccountType.CONSUMER,
      status: AccountStatus.GRANT,
    });
    const serviceNum = await this.serviceRepository.getCount({
      deleted_at: null,
    });
    const startOfThisMonth = moment.tz('Asia/Seoul').startOf('month').toDate();
    const endOfThisMonth = moment.tz('Asia/Seoul').endOf('month').toDate();
    const _paidThisMonth = await this.paymentRepository.getMonthlyPaid(
      startOfThisMonth,
      endOfThisMonth,
    );
    const paidThisMonth = _paidThisMonth.toLocaleString('ko-KR');
    const startOfLastMonth = moment
      .tz('Asia/Seoul')
      .subtract(1, 'months')
      .startOf('month')
      .toDate();
    const endOfLastMonth = moment
      .tz('Asia/Seoul')
      .subtract(1, 'months')
      .endOf('month')
      .toDate();
    const paidLastMonth = await this.paymentRepository.getMonthlyPaid(
      startOfLastMonth,
      endOfLastMonth,
    );
    const changeRate = paidLastMonth
      ? Math.round(((paidThisMonth - paidLastMonth) / paidLastMonth) * 100)
      : undefined;
    const _providerTopTen = await this.serviceRepository.providerTopTen();
    const providerTopTen = _providerTopTen.map((el, index) => {
      return {
        no: index + 1,
        email: el.email,
        name: el.name,
        total_amount: el.price * el.buyer_count,
        buyer_count: el.buyer_count,
      };
    });
    const _customerTopTen = await this.accountRepository.customerTopTen();
    const customerTopTen = _customerTopTen.map((el, index) => {
      return {
        no: index + 1,
        email: el.email,
        total_purchase: el.consumer_info?.total_pay_service || 0,
        total_amount: el.consumer_info?.total_payment || 0,
        user_type: el.user_type,
      };
    });
    const row = {
      providerNum,
      customerNum,
      serviceNum,
      paidThisMonth,
      changeRate,
      providerTopTen,
      customerTopTen,
    };
    return row;
  }
}
