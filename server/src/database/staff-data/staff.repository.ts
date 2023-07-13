import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Staff, StaffDocument } from '../schema/staff.schema';
import { genSaltSync, compareSync, hashSync } from 'bcrypt';
import { AccountType } from '../schema/account.schema';

interface CreateBody {
  user_id: string;
  password: string;
  name: string;
}

interface UpdateBody {
  _id: string;
  name: string;
  password?: string;
}

@Injectable()
export class StaffRepository {
  constructor(
    @InjectModel(Staff.name) private readonly staffModel: Model<StaffDocument>,
  ) {}

  private encrypt(plainText: string) {
    const salt = genSaltSync(6);
    return hashSync(plainText, salt);
  }

  compareHash(plainText: string, hashText: string) {
    return compareSync(plainText, hashText);
  }

  create(body: CreateBody): Promise<StaffDocument> {
    const { password, ...rest } = body;
    const encrypt_password = this.encrypt(password);
    const createdStaff = new this.staffModel({
      ...rest,
      password: encrypt_password,
    });
    return createdStaff.save();
  }

  updatePassword(_id: string, temp_password: string) {
    const encrypt_password = this.encrypt(temp_password);
    return this.staffModel.updateOne(
      {
        _id: new Types.ObjectId(_id),
      },
      {
        $set: {
          password: encrypt_password,
        },
      },
    );
  }

  getOneFromUserId(user_id: string) {
    return this.staffModel.findOne({ user_id, deleted_at: null }).lean();
  }

  getOne(_id: Types.ObjectId) {
    return this.staffModel.findOne({ _id, deleted_at: null });
  }

  async updateOne(body: UpdateBody) {
    const _id = new Types.ObjectId(body._id);
    const user = await this.getOne(_id);
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    if (body.password) {
      user.password = this.encrypt(body.password);
    }
    user.name = body.name;

    return await user.save();
  }

  async deleteOne(_id: Types.ObjectId) {
    const user = await this.getOne(_id);
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    const now = new Date();
    user.deleted_at = now;
    user.auth_key = '';
    return await user.save();
  }

  async getListAndCount(
    page: number,
    sort?: {
      field: string;
      order: string;
      // field: 'index' | 'name' | 'user_id';
      // order: 'DESC' | 'ASC';
    },
    filter?: {
      field: string;
      text: string;
      // field: 'name' | 'user_id';
      // text: string;
    },
    staff?: StaffDocument,
  ) {
    const matchQuery: FilterQuery<Staff> = {
      deleted_at: null,
      _id: { $ne: staff._id },
    };
    if (filter) {
      matchQuery[filter.field] = new RegExp(filter.text);
    }
    let order = '-created_at';
    if (sort) {
      order = `${sort.order === 'DESC' ? '-' : ''}${sort.field}`;
    }

    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;

    const count = await this.staffModel.find(matchQuery).countDocuments();
    const rows = await this.staffModel
      .find(matchQuery)
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE)
      .select('-password')
      .lean();

    return { count, rows };
  }

  async updateRefreshToken(id: string, token: string) {
    const staff = await this.getOne(new Types.ObjectId(id));
    if (!staff) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    staff.auth_key = token;
    return staff.save();
  }
}
