import { Types } from 'mongoose';
import {
  BadRequestException,
  Body,
  Get,
  Logger,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { GetProviderListDto } from './dto/getProviderList.dto';
import { ProviderService } from './provider.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateOneDto } from './dto/updateOne.dto';
import { memoryStorage } from 'multer';
import { IdDto } from 'src/common/dto/id.dto';
import { UploadedFile as S3UploadedFile } from 'src/file-upload/types/uploaded-file.interface';
import { S3FileService } from 'src/file-upload/s3-file.service';

@AdminController('provider')
export class ProviderController {
  constructor(
    private readonly S3FileService: S3FileService,
    private readonly providerService: ProviderService,
  ) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetProviderListDto) {
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
    return this.providerService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getOne(@Param('id') id: string) {
    const _id = new Types.ObjectId(id);
    return await this.providerService.getOne(_id);
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
      const response = await this.providerService.updateOne(
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
}
