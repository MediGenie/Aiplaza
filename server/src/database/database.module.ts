import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as serial from 'mongoose-serial';

import { Account, AccountSchema } from './schema/account.schema';
import { Staff, StaffSchema } from './schema/staff.schema';
import { Service, ServiceSchema } from './schema/service.schema';
import {
  ServiceUsage,
  ServiceUsageSchema,
} from './schema/service-usage.schema';
import { Sales, SalesSchema } from './schema/sales.schema';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { Board, BoardSchema } from './schema/board.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  getAutoIncrement,
  getAutoIncrementOpts,
} from './create-auto-increment-factory';
import { AccountDataModule } from './account-data/account-data.module';
import { ServiceDataModule } from './service-data/service-data.module';
import { PaymentDataModule } from './payment-data/payment-data.module';
import { SalesDataModule } from './sales-data/sales-data.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow('MONGODB_URI');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Account.name,
        useFactory: async (connection: Connection) => {
          const schema = AccountSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(Account.name);
          schema.plugin(AutoIncrement, opts);
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Staff.name,
        useFactory: async (connection: Connection) => {
          const schema = StaffSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(Staff.name);
          schema.plugin(AutoIncrement, opts);
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Service.name,
        useFactory: async (connection: Connection) => {
          const schema = ServiceSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(Service.name);
          schema.plugin(AutoIncrement, opts);
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: ServiceUsage.name,
        useFactory: async (connection: Connection) => {
          const schema = ServiceUsageSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(ServiceUsage.name);
          schema.plugin(AutoIncrement, opts);
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Sales.name,
        useFactory: async (connection: Connection) => {
          const schema = SalesSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(Sales.name);
          schema.plugin(AutoIncrement, opts);
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Payment.name,
        useFactory: async (connection: Connection) => {
          const schema = PaymentSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(Payment.name);
          schema.plugin(AutoIncrement, opts);
          schema.plugin(serial, {
            field: 'merchant_uid',
            prefix: 'MID',
            initCounter: 'monthly',
            separator: '_',
            digits: 6,
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Board.name,
        useFactory: async (connection: Connection) => {
          const schema = BoardSchema;
          const AutoIncrement = getAutoIncrement(connection);
          const opts = getAutoIncrementOpts(Board.name);
          schema.plugin(AutoIncrement, opts);
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    AccountDataModule,
    ServiceDataModule,
    PaymentDataModule,
    SalesDataModule,
  ],
})
export class DatabaseModule {}
