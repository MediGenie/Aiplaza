import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../schema/account.schema';
import { Payment, PaymentSchema } from '../schema/payment.schema';
import { Sales, SalesSchema } from '../schema/sales.schema';
import {
  ServiceUsage,
  ServiceUsageSchema,
} from '../schema/service-usage.schema';
import { Service, ServiceSchema } from '../schema/service.schema';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: ServiceUsage.name, schema: ServiceUsageSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Sales.name, schema: SalesSchema },
    ]),
  ],
  providers: [PaymentRepository],
  exports: [PaymentRepository],
})
export class PaymentDataModule {}
