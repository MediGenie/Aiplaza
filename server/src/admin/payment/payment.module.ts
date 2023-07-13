import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { PaymentDataModule } from 'src/database/payment-data/payment-data.module';
import { Payment, PaymentSchema } from 'src/database/schema/payment.schema';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    PaymentDataModule,
    AccountDataModule,
    ServiceDataModule,
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
