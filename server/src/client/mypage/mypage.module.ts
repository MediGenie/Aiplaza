import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { PaymentDataModule } from 'src/database/payment-data/payment-data.module';
import { SalesDataModule } from 'src/database/sales-data/sales-data.module';
import { Account, AccountSchema } from 'src/database/schema/account.schema';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';

@Module({
  imports: [
    AccountDataModule,
    PaymentDataModule,
    ServiceDataModule,
    SalesDataModule,
    FileUploadModule,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [MypageController],
  providers: [MypageService],
})
export class MypageModule {}
