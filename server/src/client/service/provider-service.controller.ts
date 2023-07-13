import {
  Body,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  AccountDocument,
  AccountType,
} from 'src/database/schema/account.schema';
import { AccessableUserType } from 'src/decorators/accessable-user-type.decorator';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ClientJwtGuard } from '../guards/client-jwt.guard';
import { UserTypeGuard } from '../guards/user-type.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetListDto } from './dto/getlist.dto';
import { ProviderService } from './provider-service.service';

@ClientController('provider/service')
export class ProviderServiceController {
  constructor(private readonly providerService: ProviderService) {}

  @Get('list')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getServiceList(@Query() query: GetListDto) {
    const sort =
      query.sort !== undefined
        ? {
            field: query.sort,
            order: 'asc',
          }
        : undefined;
    const filter = query.search
      ? {
          field: 'all',
          text: query.search,
        }
      : undefined;
    return this.providerService.getServiceList(
      query.page,
      8,
      sort,
      filter,
      query.num,
    );
  }

  @Get('bookmark/list/:id')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getFullBookMark(@Param('id') id: string) {
    return this.providerService.getFullBookMark(id);
  }

  @Get('bookmark/:id')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getBookMark(@Param('id') id: string) {
    return this.providerService.getBookMark(id);
  }

  @Post('bookmark')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  createBookMark(
    @Body() body: { user_id: string | undefined; service_id: string },
  ) {
    const user_id = body.user_id;
    const service_id = body.service_id;
    return this.providerService.createBookMark(user_id, service_id);
  }

  @Post()
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  @UseInterceptors(AnyFilesInterceptor())
  createService(
    @CurrentUser() user: AccountDocument,
    @Body() body: CreateServiceDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (user.type !== AccountType.PROVIDER) {
      throw new ForbiddenException('Provider만 이용 가능합니다.');
    }

    const fileMap: Record<string, Express.Multer.File> = {};
    files.forEach((file) => {
      const corrected_field_name = Buffer.from(
        file.fieldname,
        'latin1',
      ).toString('utf-8');
      const corretted_file_name = Buffer.from(
        file.originalname,
        'latin1',
      ).toString('utf-8');
      file.fieldname = corrected_field_name;
      file.originalname = corretted_file_name;
      fileMap[corrected_field_name] = file;
    });
    const { SERVICE_FILE, THUMBNAIL, ...rest_files } = fileMap;

    return this.providerService.create({
      body,
      serviceFile: SERVICE_FILE,
      thumbnail_file: THUMBNAIL,
      files: rest_files,
      writerId: user._id.toString(),
    });
  }

  @Patch(':id')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  @UseInterceptors(AnyFilesInterceptor())
  updateService(
    @Param('id') id: string,
    @CurrentUser() user: AccountDocument,
    @Body() body: CreateServiceDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (user.type !== AccountType.PROVIDER) {
      throw new ForbiddenException('Provider만 이용 가능합니다.');
    }

    const fileMap: Record<string, Express.Multer.File> = {};
    files.forEach((file) => {
      const corrected_field_name = Buffer.from(
        file.fieldname,
        'latin1',
      ).toString('utf-8');
      const corretted_file_name = Buffer.from(
        file.originalname,
        'latin1',
      ).toString('utf-8');
      file.fieldname = corrected_field_name;
      file.originalname = corretted_file_name;
      fileMap[corrected_field_name] = file;
    });
    const { SERVICE_FILE, THUMBNAIL, ...rest_files } = fileMap;

    return this.providerService.update({
      body,
      serviceFile: SERVICE_FILE,
      thumbnail_file: THUMBNAIL,
      files: rest_files,
      owner_id: user._id.toString(),
      service_id: id,
    });
  }

  @Get(':id')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  async getServicePage(
    @Param('id') id: string,
    @CurrentUser() user: AccountDocument,
  ) {
    const service_data = await this.providerService.getServicePage(id);
    if (service_data.owner !== user._id.toString()) {
      throw new ForbiddenException('사용자가 작성한 게시물이 아닙니다.');
    }
    return service_data;
  }

  @Get(':id/full')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getServiceFullData(
    @Param('id') id: string,
    @CurrentUser() user: AccountDocument,
  ) {
    return this.providerService.getServiceFullData(id, user._id.toString());
  }

  @Get(':id/result')
  @AccessableUserType(AccountType.PROVIDER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getProviderResult(@Param('id') id: string, @Query() query: GetListDto) {
    const sort =
      query.sort !== undefined
        ? {
            field: query.sort,
            order: 'asc',
          }
        : undefined;
    const filter = query.search
      ? {
          field: 'all',
          text: query.search,
        }
      : undefined;
    const limit = 10;
    return this.providerService.getProviderResultList(
      query.page,
      limit,
      sort,
      filter,
      id,
    );
  }
}
