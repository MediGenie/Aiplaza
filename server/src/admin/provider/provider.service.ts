import { Types } from 'mongoose';
import {
  AccountStatus,
  AccountType,
  RegisterFrom,
  UserType,
} from 'src/database/schema/account.schema';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { AccountRepository } from 'src/database/account-data/account.repository';
import { Pagination } from 'src/common/paginate';
import { formCreatedDate } from 'src/utils/DateUtil';
import { ServiceRepository } from 'src/database/service-data/service.repository';
import { UpdateOneDto } from './dto/updateOne.dto';
import { UploadedFile as S3UploadedFile } from 'src/file-upload/types/uploaded-file.interface';

@Injectable()
export class ProviderService {
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
    const { count, rows } = await this.accountRepository.getListAndCount(
      page,
      sort,
      filter,
      { $in: [AccountStatus.GRANT, AccountStatus.REJECT] },
      AccountType.PROVIDER,
    );

    const _rows = rows.map((el) => {
      const isEmail = el.register_from === RegisterFrom.EMAIL;
      return {
        _id: el._id,
        index: el.index,
        email: isEmail ? el.email : undefined,
        sns: !isEmail ? el.email : undefined,
        name: el.name,
        status: el.status,
        user_type:
          el.user_type === UserType.BIZ
            ? '법인'
            : el.user_type === UserType.GROUP
            ? '단체'
            : '개인',
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
    const number_of_service = await this.serviceRepository.getCount({
      owner: _id,
    });
    const result = {
      _id: data._id,
      type: data.type === AccountType.CONSUMER ? '일반회원' : '서비스 제공자',
      status: data.status,
      name: data.name,
      user_type: data.user_type,
      email: data.email,
      tel: data.tel,
      country: data.country,
      research_field: data.research_field,
      analysis_field: data.analysis_field,
      biz_regist_cert_file: [data.biz_regist_cert_file],
      address: data.address,
      address_detail: data.address_detail,
      created_at: formCreatedDate(data.created_at),
      info_type: data?.provider_info?.type,
      domain_field: data?.provider_info?.domain_field,
      biz_type: data?.provider_info?.biz_type,
      service_type: data?.provider_info?.service_type,
      service_subject: data?.provider_info?.service_subject,
      service_range: data?.provider_info?.service_range,
      model_type: data?.provider_info?.model_type,
      algorithm_program_type: data?.provider_info?.algorithm_program_type,
      total_revenue: data?.provider_info?.total_revenue.toLocaleString('ko-KR'),
      total_withdrawer:
        data?.provider_info?.total_withdrawer.toLocaleString('ko-KR'),
      rest_revenue: data?.provider_info?.rest_revenue.toLocaleString('ko-KR'),
      number_of_service,
    };
    return result;
  }

  async updateOne(id: string, data: UpdateOneDto, file?: S3UploadedFile) {
    try {
      const _id = new Types.ObjectId(id);
      const row = await await this.accountRepository.getOne(_id);
      if (!row) {
        throw new NotFoundException('찾을 수 없습니다.');
      }
      // const willDeleteFile = file ? row.file.key : undefined;
      row.status = data.status;
      row.name = data.name;
      row.user_type = data.user_type;
      row.tel = data.tel;
      row.country = data.country;
      row.research_field = data.research_field;
      row.analysis_field = data.analysis_field;
      row.address = data.address;
      row.address_detail = data.address_detail;
      row.provider_info = {
        type: data.info_type,
        domain_field: data.domain_field,
        biz_type: data.biz_type,
        service_type: data.service_type,
        service_subject: data.service_subject,
        service_range: data.service_range,
        model_type: data.model_type,
        algorithm_program_type: data.algorithm_program_type,
        total_revenue: row.provider_info?.total_revenue || 0,
        total_withdrawer: row.provider_info?.total_revenue || 0,
        rest_revenue: row.provider_info?.total_revenue || 0,
      };

      if (file) {
        row.biz_regist_cert_file = {
          name: file.originalName,
          size: file.size,
          type: file.mimetype,
          key: file.key,
          url: file.path,
        };
      }
      await row.save();
      // if (willDeleteFile) {
      //   await this.s3Service.deleteS3Object(willDeleteFile);
      // }
      return _id;
    } catch (e) {
      Logger.error('사용자 정보 수정에 실패했습니다.');
      throw e;
    }
  }
}
