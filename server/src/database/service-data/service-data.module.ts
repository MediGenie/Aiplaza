import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { Account, AccountSchema } from '../schema/account.schema';
import { Bookmark, BookmarkSchema } from '../schema/bookmark.schema';
import { ServiceForm, ServiceFormSchema } from '../schema/service-form.schema';
import {
  ServicePageInfo,
  ServicePageInfoSchema,
} from '../schema/service-page-info.schema';
import {
  ServiceUsage,
  ServiceUsageSchema,
} from '../schema/service-usage.schema';
import { Service, ServiceSchema } from '../schema/service.schema';
import { ServiceRepository } from './service.repository';

@Module({
  imports: [
    FileUploadModule,
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: ServiceUsage.name, schema: ServiceUsageSchema },
      { name: ServicePageInfo.name, schema: ServicePageInfoSchema },
      { name: ServiceForm.name, schema: ServiceFormSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
  ],
  providers: [ServiceRepository],
  exports: [ServiceRepository],
})
export class ServiceDataModule {}
