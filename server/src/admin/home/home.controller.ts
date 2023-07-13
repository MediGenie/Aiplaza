import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { HomeService } from './home.service';

@AdminController('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList() {
    return this.homeService.getList();
  }
}
