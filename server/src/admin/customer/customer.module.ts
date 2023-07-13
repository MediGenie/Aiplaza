import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { Account, AccountSchema } from 'src/database/schema/account.schema';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    FileUploadModule,
    AccountDataModule,
    ServiceDataModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
