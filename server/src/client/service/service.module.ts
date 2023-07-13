import { Module } from '@nestjs/common';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { ConsumerServiceController } from './consumer-service.controller';
import { ConsumerService } from './consumer-service.service';
import { ProviderServiceController } from './provider-service.controller';
import { ProviderService } from './provider-service.service';

@Module({
  imports: [ServiceDataModule, FileUploadModule],
  controllers: [ProviderServiceController, ConsumerServiceController],
  providers: [ProviderService, ConsumerService],
})
export class ServiceModule {}
