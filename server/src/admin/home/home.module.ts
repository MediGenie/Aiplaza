import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { PaymentDataModule } from 'src/database/payment-data/payment-data.module';
import { SalesDataModule } from 'src/database/sales-data/sales-data.module';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    PaymentDataModule,
    AccountDataModule,
    ServiceDataModule,
    SalesDataModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
