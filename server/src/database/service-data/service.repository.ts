import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, FilterQuery, Types, Connection } from 'mongoose';
import { S3FileService } from 'src/file-upload/s3-file.service';
import { UploadedFile } from 'src/file-upload/types/uploaded-file.interface';
import { YeonseiUploadService } from 'src/file-upload/yeonsei-upload.service';
import { mask } from 'src/utils/masking';
import { RegexpEscaper } from 'src/utils/RegexpEscaper';
import { Account, AccountDocument } from '../schema/account.schema';
import { Bookmark, BookmarkDocument } from '../schema/bookmark.schema';
import {
  ServiceForm,
  ServiceFormDocument,
} from '../schema/service-form.schema';
import {
  ServicePageInfo,
  ServicePageInfoDocument,
} from '../schema/service-page-info.schema';
import {
  ServiceUsage,
  ServiceUsageDocument,
  ServiceUsageStatus,
} from '../schema/service-usage.schema';
import { Service, ServiceDocument } from '../schema/service.schema';
import { FormColumn } from '../sub-schema/form-column.sub-schema';
import { FormSection } from '../sub-schema/form-section.sub-schema';
import { Media } from '../sub-schema/media.sub-schema';
import { PageColumn } from '../sub-schema/page-column.sub-schema';
import { PageSection } from '../sub-schema/page-section.sub-schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { EditServiceDto } from './dto/edit-service.dto';

interface CreateServiceUsageBody {
  service: Types.ObjectId;
  buyer: Types.ObjectId;
  price: number;
  status: ServiceUsageStatus;
  payment: Types.ObjectId;
}

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel(ServiceUsage.name)
    private readonly serviceUsageModel: Model<ServiceUsageDocument>,

    @InjectModel(ServicePageInfo.name)
    private readonly servicePageInfoModel: Model<ServicePageInfoDocument>,
    @InjectModel(ServiceForm.name)
    private readonly serviceFormModel: Model<ServiceFormDocument>,
    private readonly s3FileService: S3FileService,
    private readonly yeonseiFileService: YeonseiUploadService,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    @InjectModel(Bookmark.name)
    private readonly bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async create(opts: {
    body: CreateServiceDto;
    serviceFile: Express.Multer.File;
    thumbnail_file: Express.Multer.File;
    files: Record<string, Express.Multer.File>;
    writerId: string;
  }) {
    let _service_id = null;
    let _service_form_id = null;
    const { body, files, serviceFile, thumbnail_file, writerId } = opts;
    const uploadedFiles: UploadedFile[] = [];

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const uploaded_thumbnail = await this.s3FileService.fileUpload(
        thumbnail_file,
      );
      uploadedFiles.push(uploaded_thumbnail);

      // 서비스 생성
      const [service] = await this.serviceModel.create(
        [
          {
            owner: new Types.ObjectId(writerId),
            name: body.content.title,
            price: body.content.price,
            description: body.content.description,
            email: body.content.email,
            thumbnail: {
              key: uploaded_thumbnail.key,
              name: uploaded_thumbnail.originalName,
              size: uploaded_thumbnail.size,
              type: uploaded_thumbnail.mimetype,
              url: uploaded_thumbnail.path,
            } as Media,
          },
        ],
        { session },
      );

      // 서비스 페이지 생성
      const pageData: PageSection[] = [];
      for (let i = 0; i < body.page.length; i++) {
        const item = body.page[i];
        const pageColumns: PageColumn[] = [];

        for (let j = 0; j < item.column.length; j++) {
          const column = item.column[j];
          let image: UploadedFile;
          if (column.image && files[column.image]) {
            image = await this.s3FileService.fileUpload(files[column.image]);
            uploadedFiles.push(image);
          }

          pageColumns.push({
            type: column.type as any,
            label: column.label,
            key: column.key,
            color: column.color,
            content: column.content,
            image: image
              ? {
                  key: image.key,
                  name: image.originalName,
                  size: image.size,
                  type: image.mimetype,
                  url: image.path,
                }
              : null,
          });
        }
        pageData.push({
          label: item.label,
          key: item.key,
          columns: pageColumns,
        });
      }
      // console.log(pageData.map((v) => JSON.stringify(v)));
      await this.servicePageInfoModel.create(
        [
          {
            service: service._id,
            template: body.template,
            data: pageData,
          },
        ],
        { session },
      );
      console.log('service page 생성');
      // 서비스 폼 생성
      const formSection: FormSection[] = [];
      for (let i = 0; i < body.form.length; i++) {
        const section = body.form[i];
        const formColumns: FormColumn[] = [];
        for (let j = 0; j < section.column.length; j++) {
          const column = section.column[j];
          const column_keys = Object.keys(column);
          const _column: Record<string, any> = {};
          for (let k = 0; k < column_keys.length; k++) {
            const key = column_keys[k];
            if (key === 'image' && files[column['image']]) {
              // 이미지 처리
              const column_image = files[column['image']];
              const uploaded_column_image = await this.s3FileService.fileUpload(
                column_image,
              );
              _column['image'] = {
                key: uploaded_column_image.key,
                name: uploaded_column_image.originalName,
                size: uploaded_column_image.size,
                type: uploaded_column_image.mimetype,
                url: uploaded_column_image.path,
              } as Media;
            } else {
              _column[key] = column[key];
            }
          }
          formColumns.push(_column as any);
        }
        formSection.push({
          column: formColumns,
          description: section.description,
          label: section.label,
        });
      }
      _service_id = service._id;

      const [serviceForm] = await this.serviceFormModel.create(
        [
          {
            service: service._id,
            data: formSection,
            program_file: null,
          },
        ],
        { session },
      );

      _service_form_id = serviceForm._id;

      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      await session.endSession();
      await Promise.all(
        uploadedFiles.map((v) => this.s3FileService.deleteS3File(v.key)),
      );
      throw e;
    }
    //TODO 꼭 테스트 진행하기
    const cvt_service_id = _service_id._id.toString();
    const cvt_owner_id = writerId;

    try {
      const uploaded_program_file = await this.yeonseiFileService.fileUpload(
        serviceFile,
        cvt_service_id,
        cvt_owner_id,
      );

      const updated_program_file = await this.serviceFormModel.findById(
        _service_form_id,
      );
      updated_program_file.program_file = {
        key: uploaded_program_file.key,
        name: uploaded_program_file.originalName,
        size: uploaded_program_file.size,
        type: uploaded_program_file.mimetype,
        url: uploaded_program_file.path,
      };
      await updated_program_file.save();
    } catch (e) {
      await this.serviceModel.deleteOne({ _id: _service_id });
      await this.serviceFormModel.deleteOne({ _id: _service_form_id });
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
    const { body, files, serviceFile, thumbnail_file, service_id, owner_id } =
      opts;
    const uploadedFiles: UploadedFile[] = [];

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const uploaded_thumbnail = thumbnail_file
        ? await this.s3FileService.fileUpload(thumbnail_file)
        : null;

      if (uploaded_thumbnail !== null) {
        uploadedFiles.push(uploaded_thumbnail);
      }

      // 서비스 조회 및 수정
      const service = await this.serviceModel.findById(
        new Types.ObjectId(service_id),
        undefined,
        { session },
      );
      if (!service) {
        throw new BadRequestException('존재하지 않는 서비스 입니다.');
      }
      if (service.deleted_at !== null) {
        throw new BadRequestException('삭제된 서비스는 수정할 수 없습니다.');
      }
      if (service.owner.toString() !== opts.owner_id) {
        throw new BadRequestException('서비스를 소유하지 않았습니다.');
      }

      service.name = body.content.title;
      service.price = body.content.price;
      service.description = body.content.description;
      service.email = body.content.email;
      if (uploaded_thumbnail) {
        service.thumbnail = {
          key: uploaded_thumbnail.key,
          name: uploaded_thumbnail.originalName,
          size: uploaded_thumbnail.size,
          type: uploaded_thumbnail.mimetype,
          url: uploaded_thumbnail.path,
        };
      }
      await service.save({ session });

      // 서비스 페이지 수정
      const servicePage = await this.servicePageInfoModel.findOne(
        {
          service: service._id,
        },
        undefined,
        { session },
      );
      if (!servicePage) {
        throw new BadRequestException(
          '서비스 페이지 정보가 존재하지 않습니다.',
        );
      }

      // 서비스 페이지 생성
      const pageData: PageSection[] = [];
      for (let i = 0; i < body.page.length; i++) {
        const item = body.page[i];
        const pageColumns: PageColumn[] = [];
        for (let j = 0; j < item.column.length; j++) {
          /* FIXME 서비스 편집 시 여기에서 에러동작 columns에 옵셔널 체이닝 주어도 아래와 같은 에러 동작
          Error: ServiceForm validation failed: data.0.column.2.label: Path `label` is required.
          , data.0.column.2.type: Path `type` is required., data.0.column.4.label: Path `label` is required.
          , data.0.column.4.type: Path `type` is required., data.0.column.8.label: Path `label` is required.
          , data.0.column.8.type: Path `type` is required. at ValidationError.inspect (D:\Projects\AI_Plaza\server\node_modules\mongoose\lib\error\validation.js:50:26)  */
          const saved_column = servicePage.data[i].columns[j];
          const column = item.column[j];

          let image: UploadedFile;
          if (column.image && files[column.image]) {
            image = await this.s3FileService.fileUpload(files[column.image]);
            uploadedFiles.push(image);
          } else if (saved_column?.image) {
            image = {
              key: saved_column.image.key,
              mimetype: saved_column.image.type,
              originalName: saved_column.image.name,
              path: saved_column.image.url,
              size: saved_column.image.size,
            };
          }
          pageColumns.push({
            type: column.type as any,
            label: column.label,
            key: column.key,
            color: column.color,
            content: column.content,
            image: image
              ? {
                  key: image.key,
                  name: image.originalName,
                  size: image.size,
                  type: image.mimetype,
                  url: image.path,
                }
              : null,
          });
        }
        pageData.push({
          label: item.label,
          key: item.key,
          columns: pageColumns,
        });
      }

      servicePage.template = body.template as any;
      servicePage.data = pageData;

      await servicePage.save({ session });
      // 서비스 폼 수정
      const serviceForm = await this.serviceFormModel.findOne(
        {
          service: service._id,
        },
        undefined,
        { session },
      );
      if (!serviceForm) {
        throw new BadRequestException(
          '서비스 응답 폼 정보가 존재하지 않습니다.',
        );
      }

      // 서비스 폼 생성
      const formSection: FormSection[] = [];
      for (let i = 0; i < body.form.length; i++) {
        const section = body.form[i];
        const formColumns: FormColumn[] = [];
        for (let j = 0; j < section.column.length; j++) {
          const saved_column = serviceForm.data[i]?.column[j];
          const column = section.column[j];
          const column_keys = Object.keys(column);
          const _column: Record<string, any> = {};
          for (let k = 0; k < column_keys.length; k++) {
            const key = column_keys[k];
            if (key === 'image' && files[column['image']]) {
              // 이미지 처리
              const column_image = files[column['image']];
              const uploaded_column_image = await this.s3FileService.fileUpload(
                column_image,
              );
              uploadedFiles.push(uploaded_column_image);
              _column['image'] = {
                key: uploaded_column_image.key,
                name: uploaded_column_image.originalName,
                size: uploaded_column_image.size,
                type: uploaded_column_image.mimetype,
                url: uploaded_column_image.path,
              } as Media;
            } else if (saved_column?.image) {
              _column['image'] = saved_column.image;
            } else {
              _column[key] = column[key];
            }
          }
          formColumns.push(_column as any);
        }
        formSection.push({
          column: formColumns,
          description: section.description,
          label: section.label,
        });
      }
      if (serviceFile !== undefined) {
        //uploadedFiles.push(uploaded_thumbnail);
        const uploaded_program_file = serviceFile
          ? await this.yeonseiFileService.fileUpload(
              serviceFile,
              service_id,
              owner_id,
            )
          : null;

        serviceForm.program_file = {
          key: uploaded_program_file.key,
          name: uploaded_program_file.originalName,
          size: uploaded_program_file.size,
          type: uploaded_program_file.mimetype,
          url: uploaded_program_file.path,
        };
      }

      serviceForm.data = formSection;

      await serviceForm.save({ session });

      await session.commitTransaction();
      await session.endSession();
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      await session.endSession();
      await Promise.all(
        uploadedFiles.map((v) => this.s3FileService.deleteS3File(v.key)),
      );
      throw e;
    }
  }

  async findById(query: any) {
    return await this.serviceModel.findById(query);
  }

  async findOne(query: any) {
    return await this.serviceModel.findOne(query);
  }

  async getMany(query: any) {
    return await this.serviceModel.find(query);
  }

  getOneById(_id: Types.ObjectId) {
    return this.serviceModel.findById(_id);
  }

  async getCount(query: any) {
    return await this.serviceModel.find(query).countDocuments();
  }

  providerTopTen() {
    return this.serviceModel
      .find({ deleted_at: null })
      .sort('-buyer_count')
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
    limit?: number,
  ) {
    let matchQuery: FilterQuery<Service> = { deleted_at: null };
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $and: [
            { deleted_at: null },
            {
              $or: [
                { name: new RegExp(RegexpEscaper(filter.text)) },
                { email: new RegExp(RegexpEscaper(filter.text)) },
                // { 'owner.name': new RegExp(RegexpEscaper(filter.text)) },
              ],
            },
          ],
        };
      } else if (filter.field === 'owner') {
        matchQuery = {
          $and: [
            { deleted_at: null },
            { owner: new Types.ObjectId(filter.text) },
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
    let PAGE_SIZE = 10;

    if (limit) {
      PAGE_SIZE = limit;
    }

    const skip = (page - 1) * PAGE_SIZE;

    const count = await this.serviceModel.find(matchQuery).countDocuments();
    const rows = await this.serviceModel
      .find(matchQuery)
      .populate('owner')
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE)
      .select('-password')
      .lean();

    return { count, rows };
  }

  async getProviderResultListAndCount(
    page: number,
    sort?: {
      field: string;
      order: string;
    },
    filter?: {
      field: string;
      text: string;
    },
    limit?: number,
    num?: string,
  ) {
    const service_id = new Types.ObjectId(num);

    let matchQuery: FilterQuery<Service> = { deleted_at: null };
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $and: [
            { service: service_id },
            {
              $or: [
                { 'buyer.email': new RegExp(RegexpEscaper(filter.text)) },
                { updateAt: new RegExp(RegexpEscaper(filter.text)) },
                { state: new RegExp(RegexpEscaper(filter.text)) },
              ],
            },
            { status: { $ne: '이용전' } },
          ],
        };
      } else {
        matchQuery[filter.field] = new RegExp(filter.text);
      }
    }
    const order = '-created_at';

    if (sort.field === 'analysis') {
      matchQuery = {
        $and: [
          { service: service_id },
          { response: null },
          {
            $or: [
              { 'buyer.email': new RegExp(RegexpEscaper(filter.text)) },
              { updateAt: new RegExp(RegexpEscaper(filter.text)) },
              { state: new RegExp(RegexpEscaper(filter.text)) },
            ],
          },
          {
            resultAt: { $ne: null },
          },
        ],
      };
    } else if (sort.field === 'complete') {
      matchQuery = {
        $and: [
          { service: service_id },
          { status: '이용완료' },
          { response: { $ne: null } },
          {
            $or: [
              { 'buyer.email': new RegExp(RegexpEscaper(filter.text)) },
              { updateAt: new RegExp(RegexpEscaper(filter.text)) },
              { state: new RegExp(RegexpEscaper(filter.text)) },
            ],
          },
        ],
      };
    }
    let PAGE_SIZE = 10;

    if (limit) {
      PAGE_SIZE = limit;
    }

    const skip = (page - 1) * PAGE_SIZE;

    const totalData = await this.serviceUsageModel
      .aggregate([
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
      .match({ $and: [{ status: { $ne: '구매취소' } }] })
      .group({
        _id: null,
        count: {
          $sum: 1,
        },
      });
    const [total = 0] = totalData || [];
    const rows = await this.serviceUsageModel
      .aggregate([
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
      .match({ $and: [{ status: { $ne: '구매취소' } }] })
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE);
    const service_name = await this.serviceModel.findById(service_id);

    let count = 0;
    total.count === undefined ? (count = 0) : (count = total.count);
    return {
      count,
      rows,
      service_name: service_name.name,
    };
  }
  async getProviderListAndCount(
    page: number,
    sort?: {
      field: string;
      order: string;
    },
    filter?: {
      field: string;
      text: string;
    },
    limit?: number,
    num?: string,
  ) {
    const owner_id = new Types.ObjectId(num);
    let matchQuery: FilterQuery<Service> = { deleted_at: null };
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $and: [
            { deleted_at: null },
            { owner: owner_id },
            {
              $or: [
                { name: new RegExp(RegexpEscaper(filter.text)) },
                { email: new RegExp(RegexpEscaper(filter.text)) },
                // { 'owner.name': new RegExp(RegexpEscaper(filter.text)) },
              ],
            },
          ],
        };
      } else if (filter.field === 'owner') {
        matchQuery = {
          $and: [
            { deleted_at: null },
            { owner: new Types.ObjectId(filter.text) },
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
    let PAGE_SIZE = 10;

    if (limit) {
      PAGE_SIZE = limit;
    }

    const skip = (page - 1) * PAGE_SIZE;

    const count = await this.serviceModel.find(matchQuery).countDocuments();
    const rows = await this.serviceModel
      .find(matchQuery)
      .populate('owner')
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE)
      .select('-password')
      .lean();

    return { count, rows };
  }

  async getBuyerCountAndUserCount(id: string) {
    const _id = new Types.ObjectId(id);
    const [services] = await this.serviceModel.aggregate([
      {
        $match: {
          owner: _id,
          deleted_at: null,
        },
      },
      {
        $group: {
          _id: null,
          buyer_count: { $sum: '$buyer_count' },
          user_count: { $sum: '$user_count' },
        },
      },
    ]);
    const user_count = services?.user_count | 0;
    const buyer_count = services?.buyer_count | 0;
    return { user_count, buyer_count };
  }

  async deleteService(_id: string) {
    await this.serviceModel.updateOne(
      {
        _id,
      },
      {
        $set: {
          deleted_at: new Date(),
        },
      },
    );
  }

  //service-usage

  createServiceUsage(
    body: CreateServiceUsageBody,
  ): Promise<ServiceUsageDocument> {
    const serviceUsage = new this.serviceUsageModel(body);
    return serviceUsage.save();
  }

  async getServiceUsageCount(query: any) {
    return await this.serviceUsageModel.find(query).countDocuments();
  }

  getServiceUsage(id: string) {
    return this.serviceUsageModel.findById(new Types.ObjectId(id));
  }

  getServiceUsageFindOne(query: any) {
    return this.serviceUsageModel.findOne(query);
  }

  async getServiceUsageListAndCount(
    page: number,
    serviceId: string,
    pageSize: number,
  ) {
    const matchQuery: FilterQuery<ServiceUsage> = {
      service: new Types.ObjectId(serviceId),
    };
    const order = '-created_at';
    const skip = (page - 1) * pageSize;
    const count = await this.serviceUsageModel
      .find(matchQuery)
      .countDocuments();
    const rows = await this.serviceUsageModel
      .find(matchQuery)
      .populate('buyer')
      .sort(order)
      .skip(skip)
      .limit(pageSize)
      .lean();

    return { count, rows };
  }

  async getServicePage(id: string) {
    const _id = new Types.ObjectId(id);
    const service = await this.serviceModel.findById(_id).lean();
    if (service === null) {
      throw new NotFoundException('서비스를 찾을 수 없습니다.');
    }

    if (service.deleted_at !== null) {
      throw new NotFoundException('삭제된 서비스 입니다.');
    }
    const servicePage = await this.servicePageInfoModel
      .findOne({
        service: service._id,
      })
      .lean();

    if (servicePage === null) {
      throw new NotFoundException('서비스 페이지 정보가 존재하지 않습니다.');
    }
    const serviceUsages = await this.serviceUsageModel
      .find({
        service: service._id,
        rate: { $ne: 0 },
        review: { $ne: '' },
      })
      .sort('-created_at')
      .limit(20)
      .populate('buyer')
      .lean();
    const serviceUsagesCount = await this.serviceUsageModel
      .find({
        service: service._id,
        rate: { $ne: 0 },
        review: { $ne: '' },
      })
      .countDocuments();
    return {
      service_id: id,
      owner: service.owner.toString(),
      service_content: {
        title: service.name,
        thumbnail: service.thumbnail?.url,
        description: service.description,
        email: service.email,
        average_rate: service.average_rate,
        price: service.price,
      },
      page: {
        template: servicePage.template,
        data: servicePage.data,
      },
      reviews: {
        total: serviceUsagesCount,
        rows: serviceUsages.map((item) => ({
          _id: item._id,
          rate: item.rate,
          email: mask.email((item.buyer as unknown as Account).email),
          created_at: item.created_at,
          review: item.review,
        })),
      },
    };
  }

  async getServiceFullData(id: string, owner: string) {
    const _id = new Types.ObjectId(id);
    const service = await this.serviceModel.findById(_id).lean();
    if (service === null) {
      throw new NotFoundException('서비스를 찾을 수 없습니다.');
    }
    if (service.deleted_at !== null) {
      throw new NotFoundException('삭제된 서비스 입니다.');
    }
    if (service.owner.toString() !== owner) {
      throw new NotFoundException('서비스 소유자가 아닙니다.');
    }
    const servicePage = await this.servicePageInfoModel
      .findOne({
        service: service._id,
      })
      .lean();

    if (servicePage === null) {
      throw new NotFoundException('서비스 페이지 정보가 존재하지 않습니다.');
    }
    const serviceForm = await this.serviceFormModel
      .findOne({
        service: service._id,
      })
      .lean();

    if (serviceForm === null) {
      throw new NotFoundException('서비스 응답 폼 정보가 존재하지 않습니다.');
    }
    return {
      service_id: service._id.toString(),
      content: {
        title: service.name,
        description: service.description,
        thumbnail: {
          url: service.thumbnail.url,
          name: service.thumbnail.name,
        },
        email: service.email,
        price: service.price,
      },
      service_file: {
        url: serviceForm.program_file.url,
        name: serviceForm.program_file.name,
      },
      page: {
        template: servicePage.template,
        data: servicePage.data.map((item) => {
          return {
            key: item.key,
            label: item.label,
            columns: item.columns.map((column) => {
              const { image, ...rest } = column;
              return {
                ...rest,
                image: image ? { url: image.url, name: image.name } : null,
              };
            }),
          };
        }),
      },
      form: serviceForm.data.map((form) => {
        return {
          label: form.label,
          description: form.description,
          column: form.column.map((col) => {
            const { image, ...rest } = col as any;
            return {
              ...rest,
              image: image ? { url: image.url, name: image.name } : null,
            };
          }),
        };
      }),
    };
  }

  private async getTicketUsingServiceId(
    id: Types.ObjectId,
    user: Types.ObjectId,
  ) {
    const ticket = await this.serviceUsageModel
      .findOne({
        status: ServiceUsageStatus.NOT_USE,
        service: id,
        buyer: user,
      })
      .lean();

    if (ticket) {
      return ticket;
    }
    return null;
  }

  async hasServiceTicket(id: string, account_id: string) {
    const ticket = await this.getTicketUsingServiceId(
      new Types.ObjectId(id),
      new Types.ObjectId(account_id),
    );
    return ticket;
  }

  async getServiceForm(id: string, account_id: string) {
    const service_id = new Types.ObjectId(id);
    const user_id = new Types.ObjectId(account_id);

    const ticket = await this.getTicketUsingServiceId(service_id, user_id);

    if (!ticket) {
      throw new BadRequestException(
        '사용하지 않은 이용권이 존재하지 않아 서비스를 이용할 수 없습니다.',
      );
    }
    const service = await this.serviceModel.findById(service_id);
    if (!service) {
      throw new BadRequestException('서비스가 존재하지 않습니다.');
    }
    if (service.deleted_at !== null) {
      throw new BadRequestException('삭제된 서비스입니다.');
    }
    const serviceForm = await this.serviceFormModel.findOne({
      service: service_id,
    });
    if (!serviceForm) {
      throw new BadRequestException('서비스 응답폼 정보가 존재하지 않습니다.');
    }

    return {
      service_id: id,
      content: {
        thumbnail: service.thumbnail.url,
        title: service.name,
        description: service.description,
      },
      form: serviceForm.data,
    };
  }

  async saveServiceUsageUseInfo(
    service_id: string,
    ticket_id: string,
    data: Record<string, any>,
  ) {
    const service = await this.serviceModel.findOne({
      _id: new Types.ObjectId(service_id),
    });
    const form = await this.serviceFormModel
      .findOne({
        service: service._id,
      })
      .lean();
    const ticket = await this.serviceUsageModel.findOne({
      _id: new Types.ObjectId(ticket_id),
    });
    const buyer = await this.accountModel.findById(ticket.buyer);

    if (!service || !ticket || !buyer || !form) {
      throw new BadRequestException('정보를 받아올 수 없습니다.');
    }

    //TODO 연세대 API 데이터 불러오기
    let yeonsei_response = null;
    try {
      const buyer = await this.accountModel.findById(ticket.buyer);
      //추후 실 API로 변경해야함
      const yeonseiURL = `${process.env.YEONSEI_API}/service-management/services/run`;
      const response = await axios.post(yeonseiURL, {
        serviceId: ticket.service,
        userId: ticket.buyer,
        emailAddress: buyer.email,
        emailNotice: data.receive_email.value as boolean,
      });
      yeonsei_response = response.data.result;
    } catch (e) {
      yeonsei_response = null;
      console.log(e);
    }

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      service.user_count = service.user_count + 1;
      ticket.resultAt = new Date();
      ticket.response = yeonsei_response;
      ticket.status = ServiceUsageStatus.USED;
      ticket.result = data;
      ticket.result_form = form.data;
      ticket.thumbnail_content = {
        title: service.name,
        description: service.description,
        thumbnail: service.thumbnail,
      };
      if (buyer.consumer_info) {
        buyer.consumer_info.total_use_service =
          buyer.consumer_info.total_use_service + 1;
      }
      await service.save({ session });
      await ticket.save({ session });
      await buyer.save({ session });

      await session.commitTransaction();
      await session.endSession();
    } catch {
      await session.abortTransaction();
      await session.endSession();
    }
  }

  async getServiceResult(ticket_id: string) {
    const ticket = await this.serviceUsageModel.findById(
      new Types.ObjectId(ticket_id),
    );
    return ticket?.response;
  }

  async updateServiceUsageReviewAndRating(
    id: Types.ObjectId,
    rate: number,
    review: string,
  ) {
    const serviceUsage = await this.serviceUsageModel.findOne({
      payment: id,
    });
    if (!serviceUsage) {
      throw new BadRequestException('존재하지 않는 거래입니다.');
    }

    const session = await this.connection.startSession();
    session.startTransaction();
    serviceUsage.rate = rate;
    serviceUsage.review = review;
    const service = await this.serviceModel.findById(serviceUsage.service);
    const [serviceAverage] = await this.serviceUsageModel.aggregate([
      {
        $match: {
          $and: [
            { service: service._id },
            { status: '이용완료' },
            { rate: { $ne: 0 } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          total_average_rate: { $avg: '$rate' },
        },
      },
    ]);
    if (!serviceAverage && !service) {
      await session.abortTransaction();
      await session.endSession();
      throw new BadRequestException('별점 평균값 수정 중 오류가 발생했습니다.');
    } //63ae433e2d576fd77739b2bb

    if (service.average_rate === 0) {
      service.average_rate = rate;
    } else {
      service.average_rate = Number(
        serviceAverage?.total_average_rate.toFixed(2),
      );
      //Math.round(serviceAverage?.total_average_rate * 100) / 100;
    }

    service.review_count += 1;

    serviceUsage.save();
    service.save();
    await session.commitTransaction();
    await session.endSession();
  }

  async createBookMark(user_id: string, service_id: string) {
    const userid = new Types.ObjectId(user_id);
    const serviceid = new Types.ObjectId(service_id);
    const bookMark = await this.bookmarkModel.find({
      $and: [
        {
          user: userid,
        },
        { service: serviceid },
      ],
    });

    if (bookMark.length === 0) {
      await this.bookmarkModel.create({
        user: userid,
        service: serviceid,
      });
      const changeCount = await this.serviceModel.findById(serviceid);
      changeCount.bookmark_count = changeCount.bookmark_count + 1;
      changeCount.save();
    } else {
      await this.bookmarkModel.findOneAndDelete({
        $and: [
          {
            user: userid,
          },
          { service: serviceid },
        ],
      });
      const changeCount = await this.serviceModel.findById(serviceid);
      changeCount.bookmark_count = changeCount.bookmark_count - 1;
      changeCount.save();
    }

    const result = await this.bookmarkModel.find({ user: userid });
    return result;
  }

  async getBookMark(id: string) {
    const _id = new Types.ObjectId(id);
    const result = await this.bookmarkModel.find({
      user: _id,
    });
    return result;
  }

  async getFullBookMark(id: string) {
    const _id = new Types.ObjectId(id);
    const userBookMark = await this.bookmarkModel.find({
      user: _id,
    });

    //TODO 북마크 아에 없을때도 버튼 눌러보고 에러나면 예외처리
    if (!userBookMark) {
    }

    // eslint-disable-next-line prefer-const
    let data = [];
    userBookMark.map((value, index) => {
      data.push(value.service);
    });

    const bookMarkService = await this.serviceModel.find({
      _id: { $in: data },
    });
    return bookMarkService;
  }

  async getRequestList(
    page: number,
    sort: {
      field: string;
      order: string;
    },
    filter: {
      field: string;
      text: string;
    },
    pageSize: number,
    customer_id: Types.ObjectId,
  ) {
    let matchQuery: FilterQuery<ServiceUsage> = { deleted_at: null };
    if (filter) {
      if (filter.field === 'all') {
        matchQuery = {
          $and: [
            { buyer: customer_id },
            {
              $or: [{ 'service.name': new RegExp(RegexpEscaper(filter.text)) }],
            },
          ],
        };
      } else if (filter.field === 'owner') {
        matchQuery = {
          $and: [
            { deleted_at: null },
            { owner: new Types.ObjectId(filter.text) },
          ],
        };
      } else {
        matchQuery[filter.field] = new RegExp(filter.text);
      }
    }
    // eslint-disable-next-line prettier/prettier
    let order = '-created_at' as any;

    if (sort.field === 'analysis') {
      matchQuery = {
        $and: [
          { buyer: customer_id },
          { response: null },
          { status: '이용완료' },
          {
            $or: [
              { 'service.name': new RegExp(RegexpEscaper(filter.text)) },
              { updateAt: new RegExp(RegexpEscaper(filter.text)) },
              { state: new RegExp(RegexpEscaper(filter.text)) },
            ],
          },
          {
            resultAt: { $ne: null },
          },
        ],
      };
    } else if (sort.field === 'complete') {
      matchQuery = {
        $and: [
          { buyer: customer_id },
          { status: '이용완료' },
          { response: { $ne: null } },
          {
            $or: [
              { 'service.name': new RegExp(RegexpEscaper(filter.text)) },
              { updateAt: new RegExp(RegexpEscaper(filter.text)) },
              { state: new RegExp(RegexpEscaper(filter.text)) },
            ],
          },
        ],
      };
    } else if (sort.field === 'unused') {
      matchQuery = {
        $and: [
          { buyer: customer_id },
          { status: '이용전' },
          {
            $or: [
              { 'service.name': new RegExp(RegexpEscaper(filter.text)) },
              { updateAt: new RegExp(RegexpEscaper(filter.text)) },
              { state: new RegExp(RegexpEscaper(filter.text)) },
            ],
          },
        ],
      };
    } else if (sort.field === 'resultAt') {
      order = '-resultAt';
    }
    let PAGE_SIZE = 10;

    if (pageSize) {
      PAGE_SIZE = pageSize;
    }

    const skip = (page - 1) * PAGE_SIZE;

    const totalData = await this.serviceUsageModel
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
      ])
      .match(matchQuery)
      .match({ $and: [{ status: { $ne: '구매취소' } }] })
      .group({
        _id: null,
        count: {
          $sum: 1,
        },
      });
    const [total = 0] = totalData || [];
    const rows = await this.serviceUsageModel
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
      ])
      .match(matchQuery)
      .match({ $and: [{ status: { $ne: '구매취소' } }] })
      .sort(order)
      .skip(skip)
      .limit(PAGE_SIZE);
    let count = 0;
    total.count === undefined ? (count = 0) : (count = total.count);
    return { count, rows };
  }
  async getRequestResult(ticket_id: string) {
    const castTicket = new Types.ObjectId(ticket_id);
    const ticket = await this.serviceUsageModel.findById({ _id: castTicket });
    return {
      result_form: ticket.result_form,
      result: ticket.result,
      thumbnail_content: ticket.thumbnail_content,
    };
  }

  async getRequestResponse(ticket_id: string) {
    const castTicket = new Types.ObjectId(ticket_id);
    const ticket = await this.serviceUsageModel.findById({ _id: castTicket });
    return {
      response: ticket.response,
      thumbnail_content: ticket.thumbnail_content,
    };
  }
}
