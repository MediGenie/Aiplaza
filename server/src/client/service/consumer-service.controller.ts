import {
  Body,
  Get,
  Param,
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
import { YeonseiUploadService } from 'src/file-upload/yeonsei-upload.service';
import { ClientJwtGuard } from '../guards/client-jwt.guard';
import { UserTypeGuard } from '../guards/user-type.guard';
import { ConsumerService } from './consumer-service.service';
import { GetListDto } from './dto/getlist.dto';

@ClientController('consumer/service')
export class ConsumerServiceController {
  constructor(
    private consumerService: ConsumerService,
    private yeonseiFileService: YeonseiUploadService,
  ) {}

  @Get('list')
  @AccessableUserType(AccountType.CONSUMER)
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
    return this.consumerService.getServiceList(query.page, 8, sort, filter);
  }

  @Get('bookmark/list/:id')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getFullBookMark(@Param('id') id: string) {
    return this.consumerService.getFullBookMark(id);
  }

  @Get('bookmark/:id')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getBookMark(@Param('id') id: string) {
    return this.consumerService.getBookMark(id);
  }

  @Post('bookmark')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  createBookMark(
    @Body() body: { user_id: string | undefined; service_id: string },
  ) {
    const user_id = body.user_id;
    const service_id = body.service_id;
    return this.consumerService.createBookMark(user_id, service_id);
  }

  @Get(':id')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getServicePage(@Param('id') id: string) {
    return this.consumerService.getServicePage(id);
  }

  @Get(':id/form')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getServiceForm(
    @Param('id') id: string,
    @CurrentUser() user: AccountDocument,
  ) {
    return this.consumerService.getServiceForm(id, user._id.toString());
  }

  @Get(':id/ticket')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  getServiceTicket(
    @Param('id') id: string,
    @CurrentUser() user: AccountDocument,
  ) {
    return this.consumerService.hasServiceTicket(id, user._id.toString());
  }

  @Post('use')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async useService(
    @Body() body: Record<string, string>,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: AccountDocument,
  ) {
    const { service_id, ticket_id, ..._body } = body;
    const parsed_body: Record<string, { type: 'normal' | 'file'; value: any }> =
      {};
    Object.entries(_body).forEach(([field, _json]) => {
      const parse_data = JSON.parse(_json);
      parsed_body[field] = parse_data;
    });

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

    const converted_data: Record<
      string,
      { type: 'normal' | 'file'; value: any }
    > = {};
    const _object_keys_array = Object.keys(parsed_body);

    for (let i = 0; i < _object_keys_array.length; i++) {
      const key = _object_keys_array[i];
      const value = parsed_body[key];
      if (!value) {
        continue;
      }
      if (value.type === 'file' && value.value instanceof Array) {
        const _files: string[] = [];
        for (let i = 0; i < value.value.length; i++) {
          const _value = value.value[i];
          if (fileMap[_value]) {
            const file = fileMap[_value];
            const uploaded_file = await this.yeonseiFileService.fileUpload(
              file,
            );
            _files.push(uploaded_file.path);
          }
        }
        converted_data[key] = {
          type: 'file',
          value: _files,
        };
        continue;
      }
      try {
        converted_data[key] = value;
      } catch {
        converted_data[key] = value;
      }
    }

    const response = await this.consumerService.useService(
      service_id,
      ticket_id,
      user._id.toString(),
      converted_data,
    );
    return response;
  }

  @Get('check-result/:id')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  async checkServiceResult(@Param('id') id: string) {
    return this.consumerService.checkServiceResult(id);
  }
}
