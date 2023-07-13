import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { IdDto } from 'src/common/dto/id.dto';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { BoardService } from './board.service';
import { CreateOneDto } from './dto/createone.dto';
import { GetListDto } from './dto/getlist.dto';
import { UpdateOneDto } from './dto/updateOne.dto';
import { UploadedFile as S3UploadedFile } from 'src/file-upload/types/uploaded-file.interface';
import { S3FileService } from 'src/file-upload/s3-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminController } from 'src/decorators/admin-controller.decorator';

@AdminController('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly S3FileService: S3FileService,
  ) {}
  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetListDto) {
    const sort =
      query.sort && query.sort instanceof Array
        ? {
            field: query.sort[0],
            order: query.sort[1],
          }
        : undefined;
    const filter = query.search
      ? {
          field: '',
          text: query.search,
        }
      : undefined;

    return this.boardService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  getOne(@Param('id') id: Types.ObjectId) {
    return this.boardService.getOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
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
  @UseGuards(AdminJwtGuard)
  async create(
    @Body() body: CreateOneDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(file);
    let s3Data: S3UploadedFile;
    try {
      if (file) {
        s3Data = await this.S3FileService.fileUpload(file);
        Logger.debug(s3Data);
      }
      const response = await this.boardService.create(body, s3Data);
      return response;
    } catch (e) {
      // if (s3Data) {
      //   await this.abstractFileUploadService.deleteS3Object(s3Data.key);
      // }
      throw e;
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
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
      const response = await this.boardService.updateOne(
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
    return await this.boardService.deleteOne(_id);
  }
}
