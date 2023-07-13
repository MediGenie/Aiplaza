import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';

@Module({
  imports: [ServiceDataModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
