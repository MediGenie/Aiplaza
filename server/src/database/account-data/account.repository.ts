import { Model, FilterQuery, Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Account,
  AccountDocument,
  AccountStatus,
  AccountType,
  RegisterFrom,
  UserType,
} from '../schema/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Media } from '../sub-schema/media.sub-schema';
import { RegexpEscaper } from 'src/utils/RegexpEscaper';
import { ServiceProviderInfo } from '../sub-schema/service-provider-info.sub-schema';
import { ConsumerInfo } from '../sub-schema/consumer-info.sub-schema';

interface CreateBody {
  type: AccountType;
  register_from: RegisterFrom;
  email?: string;
  social_key?: string;
  password?: string;
  name: string;
  tel: string;
  user_type: UserType;
  country: string;
  research_field: string;
  analysis_field: string;
  address: string;
  address_detail: string;
  biz_regist_cert_file: Media;
  status: AccountStatus.READY;
}

interface UpdateBody {
  _id: string;
  status: AccountStatus;
}

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  private encrypt(plainText: string) {
    const salt = genSaltSync(6);
    return hashSync(plainText, salt);
  }

  compareHash(plainText: string, hashText: string) {
    return compareSync(plainText, hashText);
  }

  create(body: CreateBody): Promise<AccountDocument> {
    const { password, ...rest } = body;
    const encrypt_password = this.encrypt(password);
    const createdAccount = new this.accountModel({
      ...rest,
      password: encrypt_password,
    });
    if (rest.type === AccountType.PROVIDER) {
      const provider_info = {
        algorithm_program_type: '',
        biz_type: '',
        domain_field: '',
        model_type: '',
        service_range: '',
        service_subject: '',
        service_type: '',
        rest_revenue: 0,
        total_revenue: 0,
        total_withdrawer: 0,
        type: '',
      } as ServiceProviderInfo;
      createdAccount.provider_info = provider_info;
    } else if (rest.type === AccountType.CONSUMER) {
      const consumer_info = {
        interest_disease: '',
        biz_name: '',
        total_pay_service: 0,
        total_payment: 0,
        total_use_service: 0,
        forecasts_number_per_month: '',
        interest_field: '',
        interest_grade: '',
        interest_video_mobility: '',
      } as ConsumerInfo;
      createdAccount.consumer_info = consumer_info;
    }
    return createdAccount.save();
  }

  //TEMP ProviderInfo생성 코드
  // async makeProviderInfo(_id: Types.ObjectId) {
  //   const user = await this.accountModel.findById(_id);
  //   user.provider_info = {
  //     type: '',
  //     domain_field: '',
  //     biz_type: '',
  //     service_type: '',
  //     service_subject: '',
  //     service_range: '',
  //     model_type: '',
  //     algorithm_program_type: '',
  //     total_revenue: 60000,
  //     total_withdrawer: 40000,
  //     rest_revenue: 40000,
  //   };
  //   user.save();
  // }

  getOne(_id: Types.ObjectId) {
    return this.accountModel.findOne({ _id, deleted_at: null });
  }

  getMany(query: any) {
    return this.accountModel.find(query);
  }

  getCount(query: any) {
    return this.accountModel.find(query).countDocuments();
  }

  async updateOne(body: UpdateBody) {
    const _id = new Types.ObjectId(body._id);
    const account = await this.getOne(_id);
    if (!account) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    account.status = body.status;

    return await account.save();
  }
  getOneFromEmail(email: string, account_type: AccountType) {
    return this.accountModel.findOne({
      email,
      type: account_type,
      register_from: RegisterFrom.EMAIL,
    });
  }

  async checkEmailDuplicate(email: string, account_type: AccountType) {
    const user = await this.accountModel
      .findOne({
        email,
        type: account_type,
        register_from: RegisterFrom.EMAIL,
      })
      .lean();

    return !!user;
  }

  customerTopTen() {
    return this.accountModel
      .find({ type: AccountType.CONSUMER, status: AccountStatus.GRANT })
      .sort({ 'consumer_info.total_payment': -1 })
      .limit(10);
  }

  async getListAndCount(
    page: number,
    sort?: {
      field: string;
      order: string;
    },
    filter?: {
      field: string;
      text: string;
    },
    status: any = { $ne: null }, //status = READY | GRANT | REJECT | DELETE
    type: any = { $ne: null }, //type = Customer | Provider
  ) {
    let matchQuery: FilterQuery<Account> = {
      deleted_at: null,
      status,
      type,
    };
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $and: [
            { deleted_at: null },
            { status },
            { type },
            {
              $or: [
                { email: new RegExp(RegexpEscaper(filter.text)) },
                { name: new RegExp(RegexpEscaper(filter.text)) },
                { tel: new RegExp(RegexpEscaper(filter.text)) },
              ],
            },
          ],
        };
      } else {
        matchQuery[filter.field] = new RegExp(filter.text);
      }
    }
    let order = '-created_at';
    if (sort) {
      if (sort.field === 'sns') {
        order = `${sort.order === 'desc' ? '-' : ''}email`;
      } else {
        order = `${sort.order === 'desc' ? '-' : ''}${sort.field}`;
      }
    }

    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    const count = await this.accountModel.find(matchQuery).countDocuments();
    const rows = await this.accountModel
      .find(matchQuery)
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE)
      .select('-password')
      .lean();

    return { count, rows };
  }

  async getWithdrawListAndCount(
    page: number,
    sort?: {
      field: string;
      order: string;
    },
    filter?: {
      field: string;
      text: string;
    },
  ) {
    let matchQuery: FilterQuery<Account> = {
      deleted_at: { $ne: null },
    };
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $and: [
            { deleted_at: { $ne: null } },
            {
              $or: [
                { email: new RegExp(RegexpEscaper(filter.text)) },
                { name: new RegExp(RegexpEscaper(filter.text)) },
              ],
            },
          ],
        };
      } else {
        matchQuery[filter.field] = new RegExp(filter.text);
      }
    }
    let order = '-created_at';
    if (sort) {
      if (sort.field === 'sns') {
        order = `${sort.order === 'desc' ? '-' : ''}email`;
      } else {
        order = `${sort.order === 'desc' ? '-' : ''}${sort.field}`;
      }
    }

    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    const count = await this.accountModel.find(matchQuery).countDocuments();
    const rows = await this.accountModel
      .find(matchQuery)
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE)
      .select('-password')
      .lean();

    return { count, rows };
  }

  async multiplePatchPermission(_ids: string[], permission: boolean) {
    await this.accountModel.updateMany(
      {
        _id: { $in: _ids },
      },
      {
        $set: {
          status:
            permission === true ? AccountStatus.GRANT : AccountStatus.REJECT,
        },
      },
    );
  }

  async multipleDeleteAccount(_ids: string[]) {
    await this.accountModel.updateMany(
      {
        _id: { $in: _ids },
      },
      {
        $set: {
          status: AccountStatus.DELETE,
          deleted_at: new Date(),
        },
      },
    );
  }

  async multipleWithdrawlAccount(_ids: string[]) {
    await this.accountModel.updateMany(
      {
        _id: { $in: _ids },
      },
      {
        $set: {
          status: AccountStatus.LEAVE,
          deleted_at: new Date(),
        },
      },
    );
  }

  async multipleRestoreAccount(_ids: string[]) {
    await this.accountModel.updateMany(
      {
        _id: { $in: _ids },
      },
      {
        $set: {
          status: AccountStatus.READY,
          deleted_at: null,
        },
      },
    );
  }

  async updateRefreshToken(id: string, token: string) {
    const account = await this.getOne(new Types.ObjectId(id));

    if (!account) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    account.auth_key = token;
    return account.save();
  }

  async updateRefreshTokenWithdrawlAccount(id: string, token: string) {
    const account = await this.getOne(new Types.ObjectId(id));

    if (!account) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    await this.accountModel.updateMany(
      {
        _id: { $in: id },
      },
      {
        $set: {
          status: AccountStatus.LEAVE,
          deleted_at: new Date(),
        },
      },
    );
    account.auth_key = token;
    return account.save();
  }

  async deleteOne(_id: Types.ObjectId) {
    try {
      const withdrawer = await this.accountModel.findOne(_id);
      withdrawer.deleted_at = new Date();
      withdrawer.status = AccountStatus.DELETE;
      withdrawer.save();
    } catch (e) {
      throw new BadRequestException('회원 탈퇴에 실패 했습니다.');
    }
    return;
  }

  async getSocialUser(
    social_key: string,
    user_type: AccountType,
    type: RegisterFrom.GOOGLE | RegisterFrom.APPLE | RegisterFrom.NAVER,
  ) {
    const socialData = await this.accountModel.findOne({
      register_from: type,
      type: user_type,
      social_key,
    });
    if (socialData === null) {
      return socialData;
    }
    if (
      socialData?.deleted_at !== undefined &&
      socialData.deleted_at !== null
    ) {
      throw new UnauthorizedException({
        message: '탈퇴한 회원입니다.',
      });
    }

    if (socialData.status !== AccountStatus.GRANT) {
      throw new UnauthorizedException({
        message: '계정이 승인 상태가 아닙니다.',
      });
    }
    return socialData;
  }
  updatePassword(_id: string, next_password: string) {
    const encrypt_password = this.encrypt(next_password);
    return this.accountModel.updateOne(
      {
        _id: new Types.ObjectId(_id),
        register_from: RegisterFrom.EMAIL,
      },
      {
        $set: {
          password: encrypt_password,
        },
      },
    );
  }
}
