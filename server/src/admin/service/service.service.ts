import { Types } from 'mongoose';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/database/account-data/account.repository';
import { ServiceRepository } from 'src/database/service-data/service.repository';
import { Pagination } from 'src/common/paginate';
import { formCreatedDate } from 'src/utils/DateUtil';
import {
  ServiceUsage,
  ServiceUsageStatus,
} from 'src/database/schema/service-usage.schema';
import { Account } from 'src/database/schema/account.schema';

@Injectable()
export class ServiceService {
  constructor(
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
    //서비스 생성 코드
    // await this.serviceRepository.create({
    //   owner: new Types.ObjectId('637c736ae175ce8529c1bf4e'),
    //   name: 'name',
    //   price: 20000,
    //   email: 'sicsemperego@digital-x.kr',
    //   thumbnail: {
    //     name: 'a',
    //     size: 0,
    //     type: 'image/png',
    //     url: 'https://cosmatch-develop.s3.ap-northeast-2.amazonaws.com/2b862AUYyqYmzVfcusrtMDK6BBzU88VX-1667784510823.png',
    //     key: '2b862AUYyqYmzVfcusrtMDK6BBzU88VX-1667784510823.png',
    //   },
    // });
    const { count, rows } = await this.serviceRepository.getListAndCount(
      page,
      sort,
      filter,
    );

    const _rows = rows.map((el) => {
      return {
        _id: el._id,
        index: el.index,
        email: el.email,
        name: el.name,
        created_at: el.created_at,
        price: el.price.toLocaleString('ko-KR'),
        buyer_count: el.buyer_count,
        user_count: el.user_count,
      };
    });

    return new Pagination({
      page_size: pageSize,
      rows: _rows,
      total_number: count,
    });
  }

  async getOne(_id: Types.ObjectId) {
    // 서비스 이용 생성 코드
    // await this.serviceRepository.createServiceUsage({
    //   service: new Types.ObjectId('637ee994018276b5584deac7'),
    //   buyer: new Types.ObjectId('637c736ae175ce8529c1bf4e'),
    //   price: 20000,
    //   status: ServiceUsageStatus.USED,
    //   payment: new Types.ObjectId('637c724939cafa65a2f9d316'),
    // });
    const data = await this.serviceRepository.getOneById(_id);
    const owner = await this.accountRepository.getOne(data.owner);
    const ownerName = owner.name;
    const result = {
      _id: data._id,
      owner: `${ownerName}(${data.email})`,
      name: data.name,
      created_at: formCreatedDate(data.created_at),
      price: data.price.toLocaleString('ko-KR'),
      buyer_count: data.buyer_count,
      user_count: data.user_count,
      //TODO 도메인 연결되면 실 도메인으로 변경하기
      link: `https://www.aiplaza.co.kr/consumer/service/${_id}`,
    };
    return result;
  }

  async getMinorCategoryList(
    serviceId: string,
    page: number,
    pageSize: number,
  ) {
    const { count, rows } =
      await this.serviceRepository.getServiceUsageListAndCount(
        page,
        serviceId,
        pageSize,
      );

    const _rows = rows.map((el) => {
      const buyer = el.buyer as unknown as Account;
      return {
        _id: el._id,
        index: el.index,
        name: buyer.name,
        email: buyer.email,
        created_at: el.created_at,
        price: el.price.toLocaleString('ko-KR'),
        status:
          el.status === ServiceUsageStatus.CANCEL
            ? '구매취소'
            : el.status === ServiceUsageStatus.NOT_USE
            ? '이용전'
            : '이용완료',
      };
    });

    return new Pagination({
      page_size: pageSize,
      rows: _rows,
      total_number: count,
    });
  }

  async deleteService(_id: string) {
    await this.serviceRepository.deleteService(_id);
  }
}
