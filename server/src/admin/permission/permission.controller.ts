import { Types } from 'mongoose';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { PermissionService } from './permission.service';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetPermissionListDto } from './dto/getPermissionList.dto';
import { PermissionAccountDto } from './dto/permissionAccount.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';

@AdminController('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetPermissionListDto) {
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
    return this.permissionService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getOne(@Param('id') id: Types.ObjectId) {
    return await this.permissionService.getOne(id);
  }

  @Patch()
  @UseGuards(AdminJwtGuard)
  async permissionAccounts(@Body() body: PermissionAccountDto) {
    return this.permissionService.permissionAccounts(
      body._ids,
      body.permission,
    );
  }

  @Delete()
  @UseGuards(AdminJwtGuard)
  async deleteAccounts(@Body() body: DeleteAccountDto) {
    return this.permissionService.deleteAccounts(body._ids);
  }
}
