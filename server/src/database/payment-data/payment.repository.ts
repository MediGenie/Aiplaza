import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, FilterQuery, Types, Connection } from 'mongoose';
import { IamportService } from 'src/iamport/iamport.service';
import { RegexpEscaper } from 'src/utils/RegexpEscaper';
import {
  Account,
  AccountDocument,
  AccountType,
} from '../schema/account.schema';
import {
  Payment,
  PaymentDocument,
  PaymentMethod,
  PaymentStatus,
} from '../schema/payment.schema';
import { Sales, SalesDocument, SalesType } from '../schema/sales.schema';
import {
  ServiceUsage,
  ServiceUsageDocument,
  ServiceUsageStatus,
} from '../schema/service-usage.schema';
import { Service, ServiceDocument } from '../schema/service.schema';

interface CreateBody {
  service: Types.ObjectId;
  buyer: Types.ObjectId;
  status: PaymentStatus;
  method: PaymentMethod;
  amount: number;
}

@Injectable()
export class PaymentRepository {
  constructor(
    configService: ConfigService,
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel(ServiceUsage.name)
    private readonly serviceUsageModel: Model<ServiceUsageDocument>,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    @InjectModel(Sales.name)
    private readonly salesModel: Model<SalesDocument>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  create(body: CreateBody): Promise<PaymentDocument> {
    const createdAccount = new this.paymentModel(body);
    return createdAccount.save();
  }

  getOne(_id: Types.ObjectId) {
    return this.paymentModel.findOne({ _id });
  }

  getMany(query: any) {
    return this.paymentModel.find(query);
  }

  async getMonthlyPaid(startOfMonth: Date, endOfMonth: Date) {
    const [_count] = await this.paymentModel.aggregate([
      {
        $match: {
          payment_at: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
          status: PaymentStatus.PAID,
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: '$amount',
          },
        },
      },
    ]);
    if (!_count) {
      return 0;
    } else {
      return _count.count;
    }
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
  ) {
    let matchQuery: FilterQuery<Payment> = {};
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $or: [
            { 'service.name': new RegExp(RegexpEscaper(filter.text)) },
            { 'buyer.email': new RegExp(RegexpEscaper(filter.text)) },
            {
              amount: isNaN(parseInt(filter.text, 10))
                ? null
                : parseInt(filter.text, 10),
            },
          ],
        };
      } else {
        matchQuery[filter.field] = new RegExp(filter.text);
      }
    }
    const columnConverter = (col: string) => {
      if (col == 'index') return 'index';
      if (col == 'serviceName') return 'service.name';
      if (col == 'buyerEmail') return 'buyer.email';
      if (col == 'status') return 'status';
      if (col == 'method') return 'method';
      if (col == 'amount') return 'amount';
      if (col == 'payment_at') return 'payment_at';
      return col;
    };

    const order = {
      [columnConverter(sort.field)]: sort.order === 'desc' ? -1 : 1,
    };

    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    // const count = await this.paymentModel.find(matchQuery).countDocuments();
    // const rows = await this.paymentModel
    //   .find(matchQuery)
    //   .populate('service')
    //   .populate('buyer')
    //   .sort(order)
    //   .skip(skip)
    //   .limit(PAGE_SIZE)
    //   .lean();
    const totalData = await this.paymentModel
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service',
            foreignField: '_id',
            as: 'service',
          },
        },
        {
          $unwind: '$service',
        },
        {
          $lookup: {
            from: 'accounts',
            localField: 'buyer',
            foreignField: '_id',
            as: 'buyer',
          },
        },
        {
          $unwind: '$buyer',
        },
      ])
      .match(matchQuery)
      .group({
        _id: null,
        count: {
          $sum: 1,
        },
      });
    const [total = 0] = totalData || [];
    const rows = await this.paymentModel
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service',
            foreignField: '_id',
            as: 'service',
          },
        },
        {
          $unwind: '$service',
        },
        {
          $lookup: {
            from: 'accounts',
            localField: 'buyer',
            foreignField: '_id',
            as: 'buyer',
          },
        },
        {
          $unwind: '$buyer',
        },
      ])
      .match(matchQuery)
      .sort(order as any)
      .skip(skip)
      .limit(PAGE_SIZE);
    const count = total.count;
    return { count, rows };
  }

  async cancelPayment(_id) {
    const _payment_id = new Types.ObjectId(_id);
    const payment = await this.paymentModel.findById(_payment_id);
    if (!payment) {
      throw new BadRequestException('결제 정보가 존재하지 않습니다.');
    }
    const serviceUsage = await this.serviceUsageModel.findOne({
      payment: _payment_id,
    });
    if (!serviceUsage) {
      throw new BadRequestException(
        '서비스 이용권에 대한 정보가 존재하지 않습니다.',
      );
    }
    const service = await this.serviceModel.findById(payment.service);
    if (!service) {
      throw new BadRequestException('서비스에 대한 정보가 존재하지 않습니다.');
    }
    const owner = await this.accountModel.findById(service.owner);
    if (!owner) {
      throw new BadRequestException(
        '서비스제공자에 대한 정보가 존재하지 않습니다.',
      );
    }
    const imp_uid = payment.imp_uid;
    const session = await this.connection.startSession();
    let access_token = null;
    session.startTransaction();
    try {
      try {
        const _access_token = await axios({
          url: 'https://api.iamport.kr/users/getToken',
          method: 'post', // POST method
          headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
          data: {
            imp_key: `${process.env.imp_key}`, // REST API키
            imp_secret: `${process.env.imp_secret}`, // REST API Secret
          },
        });
        console.log(_access_token.data.response.access_token);
        access_token = _access_token;
      } catch (e) {
        console.log(e);
        await session.abortTransaction();
        await session.endSession();
        throw e;
      }

      try {
        const refund_result = await axios({
          url: 'https://api.iamport.kr/payments/cancel',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: access_token.data.response.access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
          },
          data: {
            reason: 'Admin refund.', // 가맹점 클라이언트로부터 받은 환불사유
            imp_uid, // imp_uid를 환불 `unique key`로 입력
            // amount: payment.amount, // 가맹점 클라이언트로부터 받은 환불금액
            // checksum: payment.amount, // [권장] 환불 가능 금액 입력
          },
        });
        const { response } = refund_result.data;
        console.log(response);
        //환불 요청 데이터 생성
        await this.salesModel.create({
          owner: owner._id,
          type: SalesType.CANCEL,
          previous_amount: owner.provider_info.total_revenue,
          next_amount:
            owner.provider_info.total_revenue -
            Math.floor(payment.amount * 0.9),
          diff_amount: Math.floor(payment.amount * 0.9),
          payment: payment._id,
          note: '관리자가 진행한 환불처리',
        });
        serviceUsage.status = ServiceUsageStatus.CANCEL;
        payment.status = PaymentStatus.CANCEL;
        payment.canceled_at = new Date();
        service.buyer_count -= 1;
        owner.provider_info.total_revenue -= Math.floor(payment.amount * 0.9);
        owner.provider_info.rest_revenue -= Math.floor(payment.amount * 0.9);
      } catch (e) {
        console.log(e);
        await session.abortTransaction();
        await session.endSession();
        throw e;
      }
      service.save();
      owner.save();
      payment.save();
      serviceUsage.save();

      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      await session.endSession();
      throw e;
    }
  }

  async orderReady(service_id: string, buyer: string) {
    const service = await this.serviceModel.findById(
      new Types.ObjectId(service_id),
    );
    if (!service) {
      throw new BadRequestException('서비스가 존재하지 않습니다.');
    }
    if (service.deleted_at !== null) {
      throw new BadRequestException('삭제된 서비스 입니다.');
    }

    const payments = await this.paymentModel.create({
      service: service._id,
      buyer: new Types.ObjectId(buyer),
      status: PaymentStatus.READY,
      amount: service.price,
    });

    const _buyer = new Types.ObjectId(buyer);
    const buyer_data = await this.accountModel.findById(_buyer);

    return {
      merchant_uid: payments.merchant_uid,
      price: service.price,
      product_name: service.name,
      buyer_name: buyer_data.name,
      buyer_email: buyer_data.email,
    };
  }

  async getPaymentFromMid(merchant_uid: string) {
    const payment = await this.paymentModel.findOne({
      merchant_uid: merchant_uid,
    });
    return payment;
  }

  async orderComplete(opts: {
    imp_uid: string;
    payment_id: Types.ObjectId;
    method: string;
    payment_at: Date;
  }) {
    const payment = await this.paymentModel.findById(opts.payment_id);
    if (!payment) {
      throw new BadRequestException('결제 정보가 존재하지 않습니다.');
    }
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const service_thumbnail = await this.serviceModel.findById(
        payment.service,
      );
      // 페이먼트 수정
      payment.status = PaymentStatus.PAID;
      payment.method = opts.method as PaymentMethod;
      payment.imp_uid = opts.imp_uid;
      payment.payment_at = opts.payment_at;
      // Service Usage 생성
      await this.serviceUsageModel.create(
        [
          {
            service: payment.service,
            buyer: payment.buyer,
            price: payment.amount,
            status: ServiceUsageStatus.NOT_USE,
            rate: 0,
            review: '',
            payment: payment._id,
            thumbnail_content: {
              title: service_thumbnail.name,
              description: service_thumbnail.description,
              thumbnail: service_thumbnail.thumbnail,
            },
            result_form: null,
            resultAt: '',
          },
        ],
        {
          session,
        },
      );
      // 매출 정보 생성
      const service = await this.serviceModel.findOne(
        {
          _id: payment.service,
        },
        undefined,
        { session },
      );
      if (!service) {
        throw new BadRequestException('존재하지 않는 서비스입니다.');
      }
      const provider = await this.accountModel.findOne(
        {
          _id: service.owner,
        },
        undefined,
        { session },
      );
      if (!provider) {
        throw new BadRequestException('존재하지 않는 서비스 제공자입니다.');
      }
      if (provider.type !== AccountType.PROVIDER) {
        throw new BadRequestException('서비스 제공자 계정이 아닙니다.');
      }
      if (!provider.provider_info) {
        provider.provider_info = {
          algorithm_program_type: '',
          biz_type: '',
          domain_field: '',
          model_type: '',
          rest_revenue: 0,
          service_range: '',
          service_subject: '',
          service_type: '',
          total_revenue: 0,
          total_withdrawer: 0,
          type: '',
        };
      }

      // 관리자 페이지 기획서 24 페이지, 서비스판매의 경우 서비스 금액의 90%만 누적된다.
      const providerGetAmount = Math.floor(payment.amount * 0.9);
      const previous_amount = provider.provider_info?.rest_revenue || 0;
      const next_amount = previous_amount + providerGetAmount;

      const [newSales] = await this.salesModel.create(
        [
          {
            owner: provider._id,
            type: SalesType.SALE,
            previous_amount: previous_amount,
            next_amount: next_amount,
            diff_amount: providerGetAmount,
            payment: payment._id,
            note: '',
          },
        ],
        { session },
      );
      // 계정 정보 변경 - 제공자
      provider.provider_info.total_revenue =
        provider.provider_info.total_revenue + providerGetAmount;
      provider.provider_info.rest_revenue =
        provider.provider_info.rest_revenue + providerGetAmount;
      await provider.save({ session });
      // 계졍 정보 변경 - 사용자
      const consumer = await this.accountModel.findOne(
        { _id: payment.buyer },
        undefined,
        { session },
      );
      if (!consumer) {
        throw new BadRequestException('존재하지 않는 서비스 이용자입니다.');
      }
      if (consumer.type !== AccountType.CONSUMER) {
        throw new BadRequestException('서비스 이용자 계정이 아닙니다.');
      }
      if (!consumer.consumer_info) {
        consumer.consumer_info = {
          biz_name: '',
          forecasts_number_per_month: '',
          interest_disease: '',
          interest_field: '',
          interest_grade: '',
          interest_video_mobility: '',
          total_pay_service: 0,
          total_payment: 0,
          total_use_service: 0,
        };
      }
      consumer.consumer_info.total_pay_service =
        consumer.consumer_info.total_pay_service + 1;
      consumer.consumer_info.total_payment =
        consumer.consumer_info.total_payment + payment.amount;

      await consumer.save({ session });
      await payment.save({ session });
      // 서비스 정보 변경
      service.buyer_count = service.buyer_count + 1;
      await service.save({ session });
      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      console.log(e);

      await session.abortTransaction();
      await session.endSession();
      throw e;
    }
  }
  async orderCancel(paymentId: string, cancelReason?: string) {
    // console.log(
    //   '[temp]orderCanceled. paymentId is ',
    //   paymentId,
    //   '[temp]cancelReason is: ',
    //   cancelReason,
    // );
    //TODO: 결제취소
    // 페이먼트 수정
    // Service Usage 변경
    // 매출 정보 생성
    // 계정 정보 변경 - 제공자
    // 계정 정보 변경 - 사용자
    const _payment_id = new Types.ObjectId(paymentId);
    const payment = await this.paymentModel.findById(_payment_id);
    if (!payment) {
      throw new BadRequestException('결제 정보가 존재하지 않습니다.');
    }
    const serviceUsage = await this.serviceUsageModel.findOne({
      payment: _payment_id,
    });
    if (!serviceUsage) {
      throw new BadRequestException(
        '서비스 이용권에 대한 정보가 존재하지 않습니다.',
      );
    }
    const service = await this.serviceModel.findById(payment.service);
    if (!service) {
      throw new BadRequestException('서비스에 대한 정보가 존재하지 않습니다.');
    }
    const owner = await this.accountModel.findById(service.owner);
    if (!owner) {
      throw new BadRequestException(
        '서비스제공자에 대한 정보가 존재하지 않습니다.',
      );
    }
    const imp_uid = payment.imp_uid;
    const session = await this.connection.startSession();
    let access_token = null;
    session.startTransaction();
    try {
      try {
        const _access_token = await axios({
          url: 'https://api.iamport.kr/users/getToken',
          method: 'post', // POST method
          headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
          data: {
            imp_key: `${process.env.imp_key}`, // REST API키
            imp_secret: `${process.env.imp_secret}`, // REST API Secret
          },
        });
        console.log(_access_token.data.response.access_token);
        access_token = _access_token;
      } catch (e) {
        console.log(e);
        await session.abortTransaction();
        await session.endSession();
        throw e;
      }

      try {
        const refund_result = await axios({
          url: 'https://api.iamport.kr/payments/cancel',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: access_token.data.response.access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
          },
          data: {
            cancelReason, // 가맹점 클라이언트로부터 받은 환불사유
            imp_uid, // imp_uid를 환불 `unique key`로 입력
            // amount: payment.amount, // 가맹점 클라이언트로부터 받은 환불금액
            // checksum: payment.amount, // [권장] 환불 가능 금액 입력
          },
        });
        const { response } = refund_result.data;
        console.log(response);
        //환불 요청 데이터 생성
        await this.salesModel.create({
          owner: owner._id,
          type: SalesType.CANCEL,
          previous_amount: owner.provider_info.total_revenue,
          next_amount:
            owner.provider_info.total_revenue -
            Math.floor(payment.amount * 0.9),
          diff_amount: Math.floor(payment.amount * 0.9),
          payment: payment._id,
          note: '사용자가 진행한 환불처리',
        });
        serviceUsage.status = ServiceUsageStatus.CANCEL;
        payment.status = PaymentStatus.CANCEL;
        payment.canceled_at = new Date();
        owner.provider_info.total_revenue -= Math.floor(payment.amount * 0.9);
        owner.provider_info.rest_revenue -= Math.floor(payment.amount * 0.9);
      } catch (e) {
        console.log(e);
        await session.abortTransaction();
        await session.endSession();
        throw e;
      }

      owner.save();
      payment.save();
      serviceUsage.save();

      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      await session.endSession();
      throw e;
    }
  }

  async getWithDrawList(page: number, userId: string) {
    const _id = new Types.ObjectId(userId);
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    const totalData = await this.paymentModel
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service',
            foreignField: '_id',
            as: 'service',
          },
        },
        {
          $unwind: '$service',
        },
        {
          $lookup: {
            from: 'accounts',
            localField: 'buyer',
            foreignField: '_id',
            as: 'buyer',
          },
        },
        {
          $unwind: '$buyer',
        },
      ])
      .match({
        $and: [{ 'service.owner': _id }],
      })
      .group({
        _id: null,
        count: {
          $sum: 1,
        },
      });
    const [total = 0] = totalData || [];
    const rows = await this.salesModel
      .aggregate([
        {
          $lookup: {
            from: 'accounts',
            localField: 'owner',
            foreignField: '_id',
            as: 'owner',
          },
        },
        {
          $unwind: '$owner',
        },
        {
          $lookup: {
            from: 'payments',
            localField: 'payment',
            foreignField: '_id',
            as: 'payment',
          },
        },
        {
          $unwind: '$payment',
        },
        {
          $lookup: {
            from: 'services',
            localField: 'payment.service',
            foreignField: '_id',
            as: 'service',
          },
        },
        {
          $unwind: '$service',
        },
        {
          $lookup: {
            from: 'accounts',
            localField: 'payment.buyer',
            foreignField: '_id',
            as: 'buyer',
          },
        },
        {
          $unwind: '$buyer',
        },
      ])
      .match({
        $and: [{ 'owner._id': _id }],
      })
      .sort('-index');
    // .skip(skip)
    // .limit(PAGE_SIZE);

    const _rows = await this.salesModel
      .aggregate([
        {
          $lookup: {
            from: 'accounts',
            localField: 'owner',
            foreignField: '_id',
            as: 'owner',
          },
        },
        {
          $unwind: '$owner',
        },
      ])
      .match({
        $and: [{ 'owner._id': _id, type: '정산' }],
      })
      .sort('-index');
    // .skip(skip)
    // .limit(PAGE_SIZE);
    const count = total.count;
    const total_rows = rows.concat(_rows);
    return { count, total_rows };
  }
  async getRevenueAndWithDrawalAndBalance(userId: string) {
    const _id = new Types.ObjectId(userId);
    const provider_info = await this.accountModel.findById(_id);

    const total_withdrawal = provider_info?.provider_info.total_withdrawer | 0;
    const total_revenue = provider_info?.provider_info.total_revenue | 0;
    const rest_revenue = provider_info?.provider_info.rest_revenue | 0;
    return {
      total_revenue: total_revenue,
      total_withdrawal: total_withdrawal,
      total_balance: rest_revenue,
    };
  }
}
