import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from 'src/database/schema/staff.schema';
import { StaffDataModule } from 'src/database/staff-data/staff-data.module';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [
    StaffDataModule,
    MongooseModule.forFeature([
      {
        name: Staff.name,
        schema: StaffSchema,
      },
    ]),
  ],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
