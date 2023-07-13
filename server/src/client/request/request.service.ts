import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { ServiceRepository } from 'src/database/service-data/service.repository';

@Injectable()
export class RequestService {
  constructor(private readonly serviceRepository: ServiceRepository) {}
  getRequestList(
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
    customer_id: Types.ObjectId,
  ) {
    return this.serviceRepository.getRequestList(
      page,
      sort,
      filter,
      pageSize,
      customer_id,
    );
  }

  getRequestResult(ticket_id: string) {
    return this.serviceRepository.getRequestResult(ticket_id);
  }
}
