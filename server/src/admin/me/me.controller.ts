import { StaffDocument } from 'src/database/schema/staff.schema';
import { MeService } from './me.service';
import { AdminJwtGuard } from './../guards/admin.jwt.guard';
import { Body, Patch, UseGuards } from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UpdateOneDto } from '../staff/dto/updateOne.dto';

@AdminController('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Patch()
  @UseGuards(AdminJwtGuard)
  async patchMe(
    @CurrentUser() staff: StaffDocument,
    @Body() body: UpdateOneDto,
  ) {
    const _id = staff._id.toString();
    return this.meService.updateMe(_id, body.name, body.password);
  }
}
