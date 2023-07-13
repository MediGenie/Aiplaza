import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';

@Module({
  imports: [ServiceDataModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
