import { Types } from 'mongoose';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { GetListDto } from './dto/getlist.dto';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { StaffService } from './staff.service';
import { DuplicationCheckDto } from './dto/duplicationCheck.dto';
import { CreateOneDto } from './dto/createone.dto';
import { IdDto } from 'src/common/dto/id.dto';
import { UpdateOneDto } from './dto/updateOne.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { StaffDocument } from 'src/database/schema/staff.schema';

@AdminController('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(
    @Query() query: GetListDto,
    @CurrentUser() staff: StaffDocument,
  ) {
    const sort =
      query.sort && query.sort instanceof Array
        ? {
            field: query.sort[0],
            order: query.sort[1],
          }
        : undefined;
    const filter =
      query.search && query.search_attr
        ? {
            field: query.search_attr,
            text: query.search,
          }
        : undefined;
    return this.staffService.getList(query.page, 10, sort, filter, staff);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  getOne(@Param('id') id: Types.ObjectId) {
    return this.staffService.getOne(id);
  }

  @Post('duplication-check')
  @UseGuards(AdminJwtGuard)
  duplicationCheck(@Body() body: DuplicationCheckDto) {
    return this.staffService.duplicationCheck(body.user_id);
  }

  @Post()
  @UseGuards(AdminJwtGuard)
  createOne(@Body() body: CreateOneDto) {
    return this.staffService.create(body.email, body.name);
  }

  @Patch(':id')
  @UseGuards(AdminJwtGuard)
  updateOne(@Param('id') id: string, @Body() body: UpdateOneDto) {
    return this.staffService.updateOne(id, body.name);
  }

  @Delete(':id')
  @UseGuards(AdminJwtGuard)
  deleteOne(@Param() param: IdDto) {
    const _id = new Types.ObjectId(param.id);
    return this.staffService.deleteOne(_id);
  }
}
