import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pagination } from 'src/common/paginate';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { ServiceRepository } from 'src/database/service-data/service.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { EditServiceDto } from './dto/edit-service.dto';

@Injectable()
export class ProviderService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async create(opts: {
    body: CreateServiceDto;
    serviceFile: Express.Multer.File;
    thumbnail_file: Express.Multer.File;
    files: Record<string, Express.Multer.File>;
    writerId: string;
  }) {
    try {
      await this.serviceRepository.create(opts);
    } catch (e) {
      throw new InternalServerErrorException(
        '서비스를 생성하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async update(opts: {
    service_id: string;
    owner_id: string;
    body: EditServiceDto;
    serviceFile?: Express.Multer.File;
    thumbnail_file?: Express.Multer.File;
    files: Record<string, Express.Multer.File>;
  }) {
    try {
      await this.serviceRepository.update(opts);
    } catch (e) {
      throw new InternalServerErrorException(
        '서비스를 수정하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  getServicePage(id: string) {
    return this.serviceRepository.getServicePage(id);
  }

  getServiceFullData(id: string, owner: string) {
    return this.serviceRepository.getServiceFullData(id, owner);
  }

  async getProviderResultList(
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
    num: string,
  ) {
    const limit = 10;

    const { rows, count, service_name } =
      await this.serviceRepository.getProviderResultListAndCount(
        page,
        sort,
        filter,
        limit,
        num,
      );
    return {
      page_size: pageSize,
      rows,
      total_number: count,
      service_name: service_name,
    };
  }

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
    num: string,
  ) {
    const limit = 8;
    const { count, rows } =
      await this.serviceRepository.getProviderListAndCount(
        page,
        sort,
        filter,
        limit,
        num,
      );

    return new Pagination({
      page_size: pageSize,
      rows,
      total_number: count,
    });
  }

  createBookMark(user_id: string, service_id: string) {
    return this.serviceRepository.createBookMark(user_id, service_id);
  }

  getFullBookMark(id: string) {
    return this.serviceRepository.getFullBookMark(id);
  }

  getBookMark(id: string) {
    return this.serviceRepository.getBookMark(id);
  }
}
