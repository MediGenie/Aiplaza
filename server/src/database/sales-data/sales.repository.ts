import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery, Connection } from 'mongoose';
import { RegexpEscaper } from 'src/utils/RegexpEscaper';
import { AccountRepository } from '../account-data/account.repository';
import { Account, AccountDocument } from '../schema/account.schema';
import { Sales, SalesDocument, SalesType } from '../schema/sales.schema';

interface CreateBody {
  owner: Types.ObjectId;
  type: SalesType;
  previous_amount: number;
  next_amount: number;
  diff_amount: number;
  note: string;
}

interface UpdateBody {
  _id: Types.ObjectId;
  note: string;
}

@Injectable()
export class SalesRepository {
  constructor(
    @InjectModel(Sales.name)
    private readonly salesModel: Model<SalesDocument>,
    private readonly accountRepository: AccountRepository,
    @InjectConnection() private readonly conenction: Connection,
  ) {}

  async create(body: CreateBody): Promise<SalesDocument> {
    const session = await this.conenction.startSession();
    session.startTransaction();
    try {
      const provider = await this.accountRepository.getOne(body.owner);
      const createdAccount = new this.salesModel(body);
      await createdAccount.save({ session });
      provider.provider_info.total_withdrawer += body.diff_amount;
      provider.provider_info.rest_revenue -= body.diff_amount;
      await provider.save({ session });
      await session.commitTransaction();
      await session.endSession();
      return createdAccount;
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();
      Logger.debug('매출 생성에 실패했습니다.');
      throw e;
    }
  }

  getOne(_id: Types.ObjectId) {
    return this.salesModel.findOne({ _id });
  }

  async updateOne(body: UpdateBody) {
    const sales = await this.getOne(body._id);
    if (!sales) {
      throw new BadRequestException('존재하지 않는 매출입니다.');
    }
    sales.note = body.note;
    return await sales.save();
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
    let matchQuery: FilterQuery<Sales> = {};
    if (filter) {
      if (filter.field === 'CALCULATE') {
        matchQuery = {
          $and: [
            { 'owner.email': new RegExp(RegexpEscaper(filter.text)) },
            { type: SalesType.CALCULATE },
          ],
        };
      } else if (filter.field === 'SALE') {
        matchQuery = {
          $and: [
            { 'owner.email': new RegExp(RegexpEscaper(filter.text)) },
            { type: SalesType.SALE },
          ],
        };
      } else if (filter.field === 'CANCEL') {
        matchQuery = {
          $and: [
            { 'owner.email': new RegExp(RegexpEscaper(filter.text)) },
            { type: SalesType.CANCEL },
          ],
        };
      } else if (filter.field === 'all') {
        matchQuery = { 'owner.email': new RegExp(RegexpEscaper(filter.text)) };
      }
    }
    const columnConverter = (col: string) => {
      if (col == 'index') return 'index';
      if (col == 'email') return 'owner.email';
      if (col == 'type') return 'type';
      if (col == 'previous_amount') return 'previous_amount';
      if (col == 'next_amount') return 'next_amount';
      if (col == 'diff_amount') return 'diff_amount';
      if (col == 'created_at') return 'created_at';
      return col;
    };
    const order = {
      [columnConverter(sort.field)]: sort.order === 'desc' ? -1 : 1,
    };

    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    const totalData = await this.salesModel
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
      .match(matchQuery)
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
      ])
      .match(matchQuery)
      .sort(order as any)
      .skip(skip)
      .limit(PAGE_SIZE);
    const count = total.count;
    return { count, rows };
  }
}
