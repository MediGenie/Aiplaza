import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { PaymentDataModule } from 'src/database/payment-data/payment-data.module';
import { SalesDataModule } from 'src/database/sales-data/sales-data.module';
import { Sales, SalesSchema } from 'src/database/schema/sales.schema';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [
    PaymentDataModule,
    AccountDataModule,
    ServiceDataModule,
    SalesDataModule,
    MongooseModule.forFeature([
      {
        name: Sales.name,
        schema: SalesSchema,
      },
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
