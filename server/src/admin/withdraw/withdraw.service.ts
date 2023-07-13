import { Types } from 'mongoose';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/database/account-data/account.repository';
import {
  AccountStatus,
  RegisterFrom,
} from 'src/database/schema/account.schema';
import { Pagination } from 'src/common/paginate';

@Injectable()
export class WithdrawService {
  constructor(private readonly accountRepository: AccountRepository) {}

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
    const { count, rows } =
      await this.accountRepository.getWithdrawListAndCount(page, sort, filter);
    const _rows = rows.map((el) => {
      const isEmail = el.register_from === RegisterFrom.EMAIL;
      return {
        _id: el._id,
        index: el.index,
        type: el.type === 'Provider' ? '서비스 제공자' : '일반회원',
        email: isEmail ? el.email : undefined,
        sns: !isEmail ? el.email : undefined,
        name: el.name,
        deleted_at: el.deleted_at,
      };
    });

    return new Pagination({
      page_size: pageSize,
      rows: _rows,
      total_number: count,
    });
  }

  async restoreAccounts(_ids: string[]) {
    await this.accountRepository.multipleRestoreAccount(_ids);
  }
}
