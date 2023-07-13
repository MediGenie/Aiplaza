import { IdDto } from './../../common/dto/id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { AdminJwtGuard } from './../guards/admin.jwt.guard';
import {
  BadRequestException,
  Body,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Logger,
  Delete,
} from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { S3FileService } from 'src/file-upload/s3-file.service';
import { ProviderService } from '../provider/provider.service';
import { GetCustomerListDto } from './dto/getCustomerList.dto';
import { memoryStorage } from 'multer';
import { UploadedFile as S3UploadedFile } from 'src/file-upload/types/uploaded-file.interface';
import { UpdateOneDto } from './dto/updateOne.dto';
import { CustomerService } from './customer.service';

@AdminController('customer')
export class CustomerController {
  constructor(
    private readonly S3FileService: S3FileService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetCustomerListDto) {
    const sort =
      query.sort && query.sort instanceof Array
        ? {
            field: query.sort[0],
            order: query.sort[1],
          }
        : undefined;
    const filter = query.search
      ? {
          field: query.search_attr ? query.search_attr : 'all',
          text: query.search,
        }
      : undefined;
    return this.customerService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getOne(@Param() param: IdDto) {
    const _id = new Types.ObjectId(param.id);
    return await this.customerService.getOne(_id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('biz_regist_cert_file', {
      fileFilter: (req, file, callback) => {
        const imageExtRegExp = /.(jpg|jpeg|png|pdf)$/i;
        const fileTypeTest = imageExtRegExp.test(file.originalname);
        const error =
          fileTypeTest === false
            ? new BadRequestException({
                message: 'jpg, jpeg, png, pdf 파일만 업로드 할 수 있습니다.',
              })
            : null;
        callback(error, fileTypeTest);
      },
      storage: memoryStorage(),
    }),
  )
  // @UseInterceptors(
  //   FileInterceptor('biz_regist_cert_file', {
  //     storage: memoryStorage(),
  //   }),
  // )
  @UseGuards(AdminJwtGuard)
  async updateOne(
    @Param() param: IdDto,
    @Body() body: UpdateOneDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(file);
    let s3Data: S3UploadedFile;
    try {
      if (file) {
        s3Data = await this.S3FileService.fileUpload(file);
        Logger.debug(s3Data);
      }
      const response = await this.customerService.updateOne(
        param.id,
        body,
        s3Data,
      );
      return response;
    } catch (e) {
      // if (s3Data) {
      //   await this.abstractFileUploadService.deleteS3Object(s3Data.key);
      // }
      throw e;
    }
  }

  @Delete(':id')
  @UseGuards(AdminJwtGuard)
  async deleteOne(@Param() param: IdDto) {
    const _id = new Types.ObjectId(param.id);
    return await this.customerService.deleteOne(_id);
  }
}
