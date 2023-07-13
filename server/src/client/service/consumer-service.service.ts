import { Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Pagination } from 'src/common/paginate';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { ServiceRepository } from 'src/database/service-data/service.repository';

@Injectable()
export class ConsumerService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async getServiceList(
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
    const limit = 8;
    const { count, rows } = await this.serviceRepository.getListAndCount(
      page,
      sort,
      filter,
      limit,
    );

    return new Pagination({
      page_size: pageSize,
      rows,
      total_number: count,
    });
  }

  getServicePage(id: string) {
    return this.serviceRepository.getServicePage(id);
  }
  getServiceForm(id: string, user_id: string) {
    return this.serviceRepository.getServiceForm(id, user_id);
  }
  async hasServiceTicket(id: string, account_id: string) {
    const ticket = await this.serviceRepository.hasServiceTicket(
      id,
      account_id,
    );
    return ticket?._id?.toString?.() || null;
  }
  async useService(
    service_id: string,
    ticket_id: string,
    buyer_id: string,
    data: Record<string, any>,
  ) {
    const ticket = await this.serviceRepository.getServiceUsage(ticket_id);
    if (ticket?.buyer?.toString?.() !== buyer_id) {
      throw new BadRequestException('이용권의 소유자가 아닙니다.');
    }
    // TODO: 연세대에 서비스 요청.
    await this.serviceRepository.saveServiceUsageUseInfo(
      service_id,
      ticket_id,
      data,
    );
  }
  async checkServiceResult(ticket_id: string) {
    const ticket = await this.serviceRepository.getServiceResult(ticket_id);
    return !!ticket;
  }

  createBookMark(user_id: string, service_id: string) {
    return this.serviceRepository.createBookMark(user_id, service_id);
  }

  getBookMark(id: string) {
    return this.serviceRepository.getBookMark(id);
  }

  getFullBookMark(id: string) {
    return this.serviceRepository.getFullBookMark(id);
  }
}
