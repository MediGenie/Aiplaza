import { formCreatedDate } from 'src/utils/DateUtil';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccountRepository } from 'src/database/account-data/account.repository';
import { PaymentRepository } from 'src/database/payment-data/payment.repository';
import { Account } from 'src/database/schema/account.schema';
import { S3FileService } from 'src/file-upload/s3-file.service';
import { PatchMyInfoDto } from './dto/patch-myInfo-dto';
import { PatchPasswordDto } from './dto/patch-password-dto';
import { PatchServiceInfoDto } from './dto/patch-service-info-dto';
import { ServiceRepository } from 'src/database/service-data/service.repository';
import { PatchProviderServiceInfoDto } from './dto/patch-provider-service-info-dto';
import { SalesRepository } from 'src/database/sales-data/sales.repository';

@Injectable()
export class MypageService {
  private static readonly pagesize = 10;
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly accountRepository: AccountRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly salesRepository: SalesRepository,
    private readonly s3FileService: S3FileService,
  ) {}

  async getMyInfo(userId: string) {
    try {
      const {
        user_type,
        name,
        tel,
        country,
        research_field,
        analysis_field,
        address,
        address_detail,
      } = await this.accountModel.findById(userId);
      return {
        user_type,
        name,
        tel,
        country,
        research_field,
        analysis_field,
        address,
        address_detail,
      };
    } catch (e) {
      throw new InternalServerErrorException(
        '내 정보를 조회하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async patchMyInfo(userId: string, body: PatchMyInfoDto) {
    const user = await this.accountModel.findById(userId);
    try {
      user.user_type = body.user_type;
      user.name = body.name;
      user.tel = body.tel;
      user.country = body.country;
      user.research_field = body.research_field;
      user.analysis_field = body.analysis_field;
      user.address = body.address;
      user.address_detail = body.address_detail;
      user.save();
    } catch (e) {
      throw new InternalServerErrorException(
        '내 정보를 수정하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async changePassword(userId: string, body: PatchPasswordDto) {
    try {
      await this.accountRepository.updatePassword(userId, body.password);
    } catch (e) {
      throw new InternalServerErrorException(
        '내 정보를 수정하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async getServiceInfo(userId: string) {
    const _id = new Types.ObjectId(userId);
    const user = await this.accountRepository.getOne(_id);
    try {
      return {
        interest_disease: user.consumer_info.interest_disease,
        interest_field: user.consumer_info.interest_field,
        interest_video_mobility: user.consumer_info.interest_video_mobility,
        interest_grade: user.consumer_info.interest_grade,
        biz_name: user.consumer_info.biz_name,
        biz_regist_cert_file: user.biz_regist_cert_file,
        forecasts_number_per_month:
          user.consumer_info.forecasts_number_per_month,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        '서비스 정보를 조회하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async patchServiceInfo(
    userId: string,
    body: PatchServiceInfoDto,
    file?: Express.Multer.File,
  ) {
    const _id = new Types.ObjectId(userId);
    const user = await this.accountRepository.getOne(_id);
    try {
      if (file) {
        const uploaded_file = await this.s3FileService.fileUpload(file);
        if (uploaded_file) {
          user.biz_regist_cert_file = {
            key: uploaded_file.key,
            name: uploaded_file.originalName,
            size: uploaded_file.size,
            type: uploaded_file.mimetype,
            url: uploaded_file.path,
          };
        }
      }
      if (body.interest_disease) {
        user.consumer_info.interest_disease = body.interest_disease;
      }
      if (body.interest_field) {
        user.consumer_info.interest_field = body.interest_field;
      }
      if (body.interest_video_mobility) {
        user.consumer_info.interest_video_mobility =
          body.interest_video_mobility;
      }
      if (body.interest_grade) {
        user.consumer_info.interest_grade = body.interest_grade;
      }
      if (body.biz_name) {
        user.consumer_info.biz_name = body.biz_name;
      }
      if (body.forecasts_number_per_month) {
        user.consumer_info.forecasts_number_per_month =
          body.forecasts_number_per_month;
      }
      user.save();
    } catch (e) {
      throw new BadRequestException(
        '서비스 정보를 수정하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async withdrawl(userId: string) {
    return await this.accountRepository.multipleDeleteAccount([userId]);
  }

  async getPaymentList(userId: string, page: number, order: string) {
    const _id = new Types.ObjectId(userId);
    const user = await this.accountRepository.getOne(_id);
    const email = user.email;
    if (!email) {
      throw new BadRequestException('해당하는 유저가 존재하지 않습니다.');
    }
    console.log(order);
    let field = '';
    if (order === 'newest') {
      field = 'created_at';
    } else if (order === 'hangeul') {
      field = 'service.name';
    } else if (order === 'userNum') {
      field = 'service.user_count';
    } else {
      throw new BadRequestException('잘못된 요청입니다.');
    }
    let sort = null;
    if (order === 'hangeul') {
      sort = {
        field,
        order: 'asc',
      };
    } else {
      sort = {
        field,
        order: 'desc',
      };
    }
    const filter = {
      field: 'buyer.email',
      text: email,
    };
    const { count, rows } = await this.paymentRepository.getListAndCount(
      page,
      sort,
      filter,
    );
    const result = await Promise.all(
      rows.map(async (el) => {
        const serviceUsage =
          await this.serviceRepository.getServiceUsageFindOne({
            payment: el._id,
          });
        let status = '알수없음';
        if (el.status === 'paid' && serviceUsage.response === null) {
          status = '이용전';
        } else if (el.status === 'paid' && serviceUsage.review !== '') {
          status = '이용완료';
        } else if (el.status === 'cancelled') {
          status = '구매취소';
        } else if (
          serviceUsage?.review !== undefined &&
          serviceUsage?.review === '' &&
          el.status === 'paid' &&
          serviceUsage.response !== null
        ) {
          status = '리뷰작성';
        } else {
          status = '결제실패';
        }

        //FIXME 추후 결제 관련해서 에러난다면 여기 찾아보기
        return {
          _id: el.service._id,
          index: el.index,
          name: el.service.name,
          created_at: formCreatedDate(el.created_at),
          price: el.amount.toLocaleString('ko-KR'),
          payment_id: el._id,
          status,
        };
      }),
    );
    return {
      rows: result,
      total_number: count,
      page_size: MypageService.pagesize,
    };
  }

  async orderCancel(paymentId: string, reason: string) {
    return await this.paymentRepository.orderCancel(paymentId, reason);
  }

  async patchReview(paymentId: string, ratingValue: number, review: string) {
    const _id = new Types.ObjectId(paymentId);
    const payment = await this.paymentRepository.getOne(_id);
    await this.serviceRepository.updateServiceUsageReviewAndRating(
      payment._id,
      ratingValue,
      review,
    );
  }

  async getProviderServiceInfo(userId: string) {
    const _id = new Types.ObjectId(userId);
    const user = await this.accountRepository.getOne(_id);
    try {
      return {
        type: user.provider_info.type,
        domain_field: user.provider_info.domain_field,
        biz_type: user.provider_info.biz_type,
        service_type: user.provider_info.service_type,
        service_subject: user.provider_info.service_subject,
        service_range: user.provider_info.service_range,
        model_type: user.provider_info.model_type,
        algorithm_program_type: user.provider_info.algorithm_program_type,
      };
    } catch (e) {
      throw new InternalServerErrorException(
        '서비스 정보를 조회하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async patchProviderServiceInfo(
    userId: string,
    body: PatchProviderServiceInfoDto,
  ) {
    const _id = new Types.ObjectId(userId);
    const user = await this.accountRepository.getOne(_id);
    try {
      if (body.type) {
        user.provider_info.type = body.type;
      }
      if (body.domain_field) {
        user.provider_info.domain_field = body.domain_field;
      }
      if (body.biz_type) {
        user.provider_info.biz_type = body.biz_type;
      }
      if (body.service_type) {
        user.provider_info.service_type = body.service_type;
      }
      if (body.service_subject) {
        user.provider_info.service_subject = body.service_subject;
      }
      if (body.service_range) {
        user.provider_info.service_range = body.service_range;
      }
      if (body.model_type) {
        user.provider_info.model_type = body.model_type;
      }
      if (body.algorithm_program_type) {
        user.provider_info.algorithm_program_type = body.algorithm_program_type;
      }
      user.save();
    } catch (e) {
      throw new BadRequestException(
        '서비스 정보를 수정하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async getServiceList(userId: string, page: number) {
    const filter = {
      field: 'owner',
      text: userId,
    };
    const { count, rows } = await this.serviceRepository.getListAndCount(
      page,
      undefined,
      filter,
    );
    const { user_count, buyer_count } =
      await this.serviceRepository.getBuyerCountAndUserCount(userId);
    const result = rows.map((el) => {
      return {
        _id: el._id,
        name: el.name,
        created_at: formCreatedDate(el.created_at),
        buyerNum: el.buyer_count.toLocaleString('ko-KR'),
        usedNum: el.user_count.toLocaleString('ko-KR'),
        price: el.price.toLocaleString('ko-KR'),
      };
    });
    return {
      totalBuyer: buyer_count.toLocaleString('ko-KR'),
      totalUsed: user_count.toLocaleString('ko-KR'),
      rows: result,
      total_number: count,
      page_size: MypageService.pagesize,
    };
  }

  async getWithDrawList(userId: string, page: number) {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    const { count, total_rows } = await this.paymentRepository.getWithDrawList(
      page,
      userId,
    );
    const total_rows_sort = total_rows.sort((a, b) => b.index - a.index);
    const result = total_rows_sort.map((el) => {
      let amount = null;
      if (el.diff_amount !== undefined) {
        amount = el.diff_amount;
      } else {
        amount = el.payment?.amount;
      }
      return {
        state: el.type,
        service_name: el.service?.name,
        created_at: formCreatedDate(el.created_at),
        buyer_email: el.buyer?.email,
        price: amount,
      };
    });

    const skip_result = result.slice(skip, skip + PAGE_SIZE);
    const { total_revenue, total_withdrawal, total_balance } =
      await this.paymentRepository.getRevenueAndWithDrawalAndBalance(userId);

    return {
      totalRevenue: total_revenue,
      totalWithdrawal: total_withdrawal,
      totalBalance: total_balance,
      rows: skip_result,
      total_number: result.length,
      page_size: MypageService.pagesize,
    };
  }
}
