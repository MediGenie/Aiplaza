import { formCreatedDate } from 'src/utils/DateUtil';
import { Types } from 'mongoose';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { PaymentRepository } from './../../database/payment-data/payment.repository';
import { Injectable } from '@nestjs/common';
import { Service } from 'src/database/schema/service.schema';
import { Account } from 'src/database/schema/account.schema';
import { Pagination } from 'src/common/paginate';
import { AccountRepository } from 'src/database/account-data/account.repository';
import { ServiceRepository } from 'src/database/service-data/service.repository';
import { PaymentStatusFormatter } from 'src/utils/PaymentStatusFormatter';
import {
  PaymentMethod,
  PaymentStatus,
} from 'src/database/schema/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly accountRepository: AccountRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async getList(
    page: number,
    pageSize: number,
    sort: SortOptions = {
      field: 'index',
      order: 'desc',
    },
    filter: filterOptions = {
      field: 'all',
      text: '',
    },
  ) {
    // payment 생성 코드
    // await this.paymentRepository.create({
    //   service: new Types.ObjectId('637ee994018276b5584deac7'),
    //   buyer: new Types.ObjectId('637c736ae175ce8529c1bf4e'),
    //   status: PaymentStatus.READY,
    //   method: PaymentMethod.CARD,
    //   amount: 20000,
    // });
    const { count, rows } = await this.paymentRepository.getListAndCount(
      page,
      sort,
      filter,
    );

    const _rows = rows.map((el) => {
      const service = el.service as unknown as Service;
      const buyer = el.buyer as unknown as Account;
      const serviceName = service.name;
      const buyerEmail = buyer.email;

      return {
        _id: el._id,
        index: el.index,
        serviceName,
        buyerEmail,
        status: PaymentStatusFormatter(el.status),
        //TODO: 결제방법은 PG사 결정 이후 한글로 나오게 변경 필요
        method: el.method,
        amount: el.amount.toLocaleString('ko-KR'),
        payment_at: formCreatedDate(el.payment_at),
      };
    });

    return new Pagination({
      page_size: pageSize,
      rows: _rows,
      total_number: count,
    });
  }

  async getOne(_id: Types.ObjectId) {
    const data = await this.paymentRepository.getOne(_id);
    const service = await this.serviceRepository.findOne({ _id: data.service });
    const buyer = await this.accountRepository.getOne(data.buyer);
    const result = {
      _id: data._id,
      name: service.name,
      buyer: buyer.name,
      email: buyer.email,
      status: PaymentStatusFormatter(data.status),
      //TODO: 결제방법은 PG사 결정 이후 한글로 나오게 변경 필요
      method: data.method,
      amount: data.amount.toLocaleString('ko-KR'),
      payment_at: data.payment_at,
    };
    return result;
  }

  async cancelPayment(_id: Types.ObjectId) {
    await this.paymentRepository.cancelPayment(_id);
  }
}
