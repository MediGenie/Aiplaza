import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/common/paginate';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { AccountRepository } from 'src/database/account-data/account.repository';
import {
  AccountStatus,
  AccountType,
  RegisterFrom,
  UserType,
} from 'src/database/schema/account.schema';

@Injectable()
export class PermissionService {
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
    //가계정 생성 코드
    // await this.accountRepository.create({
    //   type: AccountType.CONSUMER,
    //   register_from: RegisterFrom.GOOGLE,
    //   email: 'tttttttteeess1231231t@gmial.com',
    //   password: 'password123',
    //   name: '랜덤이름',
    //   tel: '00000000000',
    //   user_type: UserType.GROUP,
    //   country: 'korea',
    //   research_field: '연구필드',
    //   analysis_field: '분석필드',
    //   address: '서울 송파구',
    //   address_detail: '도로앞 4층',
    //   biz_regist_cert_file: {
    //     name: 'a',
    //     size: 0,
    //     type: 'image/png',
    //     url: 'https://cosmatch-develop.s3.ap-northeast-2.amazonaws.com/2b862AUYyqYmzVfcusrtMDK6BBzU88VX-1667784510823.png',
    //     key: '2b862AUYyqYmzVfcusrtMDK6BBzU88VX-1667784510823.png',
    //   },
    //   status: AccountStatus.READY,
    // });
    // return

    const { count, rows } = await this.accountRepository.getListAndCount(
      page,
      sort,
      filter,
      AccountStatus.READY,
    );

    const _rows = rows.map((el) => {
      const isEmail = el.register_from === RegisterFrom.EMAIL;
      return {
        _id: el._id,
        index: el.index,
        email: isEmail ? el.email : undefined,
        sns: !isEmail ? el.email : undefined,
        name: el.name,
        type: el.type === AccountType.CONSUMER ? '일반회원' : '서비스 제공자',
        tel: el.tel,
        created_at: el.created_at,
      };
    });

    return new Pagination({
      page_size: pageSize,
      rows: _rows,
      total_number: count,
    });
  }

  async getOne(_id: Types.ObjectId) {
    const data = await this.accountRepository.getOne(_id);
    const result = {
      _id: data._id,
      status: data.status,
      type: data.type === AccountType.CONSUMER ? '일반회원' : '서비스 제공자',
      name: data.name,
      user_type: data.user_type,
      email: data.email,
      tel: data.tel,
      country: data.country,
      research_field: data.research_field,
      analysis_field: data.analysis_field,
      biz_regist_cert_file: [data.biz_regist_cert_file],
      address: `${data.address} ${data.address_detail}`,
    };
    return result;
  }

  async permissionAccounts(_ids: string[], permission: boolean) {
    await this.accountRepository.multiplePatchPermission(_ids, permission);
  }

  async deleteAccounts(_ids: string[]) {
    await this.accountRepository.multipleDeleteAccount(_ids);
  }
}
