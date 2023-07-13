import { IdDto } from './../../common/dto/id.dto';
import { Types } from 'mongoose';
import { Body, Delete, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { GetServiceListDto } from './dto/getServiceList.dto';
import { ServiceService } from './service.service';
import { PaginateDto } from 'src/common/paginate';
import { DeleteAccountDto } from '../permission/dto/deleteAccount.dto';
import { DeleteServiceDto } from './dto/deleteService.dto';

@AdminController('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetServiceListDto) {
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
    return this.serviceService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getOne(@Param('id') id: string) {
    const _id = new Types.ObjectId(id);
    return await this.serviceService.getOne(_id);
  }

  @Get(':id/minor')
  @UseGuards(AdminJwtGuard)
  getListMinorCategory(@Param() param: IdDto, @Query() query: PaginateDto) {
    return this.serviceService.getMinorCategoryList(param.id, query.page, 5);
  }

  @Delete(':id')
  @UseGuards(AdminJwtGuard)
  async deleteService(@Param() param: DeleteServiceDto) {
    console.log('im in delete controller');
    return this.serviceService.deleteService(param.id);
  }
}
