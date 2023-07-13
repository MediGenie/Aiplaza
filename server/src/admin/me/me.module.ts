import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from 'src/database/schema/staff.schema';
import { StaffDataModule } from 'src/database/staff-data/staff-data.module';
import { MeController } from './me.controller';
import { MeService } from './me.service';

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
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
