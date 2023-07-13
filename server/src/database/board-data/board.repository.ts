import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

import { genSaltSync, compareSync, hashSync } from 'bcrypt';
import { Board, BoardDocument } from '../schema/board.schema';
import { Media } from '../sub-schema/media.sub-schema';

interface CreateBody {
  title: string;
  content: string;
  image?: Media;
}

interface UpdateBody {
  _id: string;
  title: string;
  content: string;
  image: Media;
}

@Injectable()
export class BoardRepository {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
  ) {}

  async getList(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const result = this.boardModel
      .find()
      .sort('-index')
      .limit(limit)
      .skip(skip);

    const count = this.boardModel.find().count();

    return { result, count };
  }

  private encrypt(plainText: string) {
    const salt = genSaltSync(6);
    return hashSync(plainText, salt);
  }

  compareHash(plainText: string, hashText: string) {
    return compareSync(plainText, hashText);
  }

  create(body: CreateBody): Promise<BoardDocument> {
    const { ...rest } = body;
    const createdBoard = new this.boardModel({
      ...rest,
    });
    return createdBoard.save();
  }

  getOneFromUserId(user_id: string) {
    return this.boardModel.findOne({ user_id, deleted_at: null }).lean();
  }

  getOne(_id: Types.ObjectId) {
    const result = this.boardModel.findOne({ _id, deleted_at: null });
    return result;
  }

  async updateOne(body: UpdateBody) {
    const _id = new Types.ObjectId(body._id);
    const user = await this.getOne(_id);
    if (!user) {
      throw new BadRequestException('존재하지 않는 공지사항입니다.');
    }

    return await user.save();
  }

  async deleteOne(_id: Types.ObjectId) {
    try {
      await this.boardModel.deleteOne(_id);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 공지사항입니다.');
    }
    return;
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
    const matchQuery: FilterQuery<Board> = {
      deleted_at: null,
    };
    if (filter) {
      matchQuery['title'] = new RegExp(filter.text);
    }
    let order = '-index';
    if (sort) {
      if (sort.order === 'desc') {
        order = '-' + sort.field;
      } else if (sort.order === 'asc') {
        order = sort.field;
      }
    }

    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    const count = await this.boardModel.find(matchQuery).countDocuments();
    const rows = await this.boardModel
      .find(matchQuery)
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean();
    return { count, rows };
  }
}
