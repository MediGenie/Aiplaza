import { RegexpEscaper } from 'src/utils/RegexpEscaper';
import { Types } from 'mongoose';
import { formCreatedDate } from 'src/utils/DateUtil';
import { Account, AccountType } from 'src/database/schema/account.schema';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/database/account-data/account.repository';
import { PaymentRepository } from 'src/database/payment-data/payment.repository';
import { SalesRepository } from 'src/database/sales-data/sales.repository';
import { ServiceRepository } from 'src/database/service-data/service.repository';
import { Pagination } from 'src/common/paginate';
import { CreateOneDto } from './dto/createone.dto';
import { SalesType } from 'src/database/schema/sales.schema';

@Injectable()
export class SalesService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly salesRepository: SalesRepository,
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
    // sales 생성 코드
    // await this.salesRepository.create({
    //   owner: new Types.ObjectId('637c736ae175ce8529c1bf4e'),
    //   type: SalesType.CANCEL,
    //   previous_amount: 0,
    //   next_amount: 20000,
    //   diff_amount: 20000,
    //   note: '첫판매',
    // });
    const { count, rows } = await this.salesRepository.getListAndCount(
      page,
      sort,
      filter,
    );

    const _rows = rows.map((el) => {
      const owner = el.owner as unknown as Account;
      const email = owner.email;

      return {
        _id: el._id,
        index: el.index,
        email,
        type: el.type,
        previous_amount: el.previous_amount.toLocaleString('ko-KR'),
        next_amount: el.next_amount.toLocaleString('ko-KR'),
        diff_amount: el.diff_amount.toLocaleString('ko-KR'),
        created_at: formCreatedDate(el.created_at),
      };
    });

    return new Pagination({
      page_size: pageSize,
      rows: _rows,
      total_number: count,
    });
  }

  async getOne(_id: Types.ObjectId) {
    const data = await this.salesRepository.getOne(_id);
    const owner = await this.accountRepository.getOne(data.owner);
    const result = {
      _id: data._id,
      email: owner.email,
      type: data.type,
      previous_amount: data.previous_amount.toLocaleString('ko-KR'),
      next_amount: data.next_amount.toLocaleString('ko-KR'),
      diff_amount: data.diff_amount.toLocaleString('ko-KR'),
      created_at: formCreatedDate(data.created_at),
      note: data.note,
    };
    return result;
  }

  async updateOne(_id: Types.ObjectId, note: string) {
    const data = {
      _id,
      note,
    };
    await this.salesRepository.updateOne(data);
  }

  async findProvider(search: string) {
    const data = {
      type: AccountType.PROVIDER,
      email: new RegExp(RegexpEscaper(search)),
    };
    const provider = await this.accountRepository.getMany(data);
    return provider.map((el) => {
      return {
        _id: el._id,
        email: el.email,
      };
    });
  }

  async getLastAmount(_id: Types.ObjectId) {
    const provider = await this.accountRepository.getOne(_id);
    return provider.provider_info.rest_revenue;
  }

  async create(body: CreateOneDto) {
    const owner = new Types.ObjectId(body.owner);
    const type = SalesType.CALCULATE;
    const provider = await this.accountRepository.getOne(owner);
    if (body.previous_amount !== provider.provider_info.rest_revenue) {
      throw new BadRequestException('변조된 요청입니다.');
    }
    const data = {
      owner,
      type,
      previous_amount: body.previous_amount,
      next_amount: body.next_amount,
      diff_amount: body.diff_amount,
      note: body.note,
    };
    await this.salesRepository.create(data);
  }
}
