import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Staff, StaffDocument } from 'src/database/schema/staff.schema';
import { Model, Types } from 'mongoose';
import { SortOptions } from 'src/common/paginate/sort.options';
import { Pagination } from 'src/common/paginate';
import { filterOptions } from 'src/common/paginate/filter.options';
import { StaffRepository } from 'src/database/staff-data/staff.repository';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async getList(
    page: number,
    pageSize: number,
    sort: SortOptions = {
      field: 'index',
      order: 'desc',
    },
    filter: filterOptions = {
      field: 'user_id',
      text: '',
    },
    staff?: StaffDocument,
  ) {
    const { count, rows } = await this.staffRepository.getListAndCount(
      page,
      sort,
      filter,
      staff,
    );

    return new Pagination({
      page_size: pageSize,
      rows,
      total_number: count,
    });
  }

  async getOne(id: Types.ObjectId) {
    const data = await this.staffRepository.getOne(id);
    const result = {
      email: data.user_id,
      name: data.name,
    };
    return result;
  }

  async duplicationCheck(user_id: string) {
    const data = await this.staffRepository.getOneFromUserId(user_id);
    if (data) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    } else {
      return true;
    }
  }

  async create(user_id: string, name: string) {
    try {
      await this.staffRepository.create({
        user_id,
        name,
        password: user_id,
      });
    } catch (e) {
      Logger.error('관리자 계정 생성에 실패했습니다.');
      throw e;
    }
  }

  async updateOne(_id: string, name: string) {
    await this.staffRepository.updateOne({ _id, name });
  }

  async deleteOne(_id: Types.ObjectId) {
    await this.staffRepository.deleteOne(_id);
  }
}
