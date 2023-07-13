import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from '../schema/staff.schema';
import { StaffRepository } from './staff.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
  ],
  providers: [StaffRepository],
  exports: [StaffRepository],
})
export class StaffDataModule {}
