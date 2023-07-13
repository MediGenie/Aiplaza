import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { SalesRepository } from './sales.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sales, SalesSchema } from '../schema/sales.schema';

@Module({
  imports: [
    AccountDataModule,
    MongooseModule.forFeature([{ name: Sales.name, schema: SalesSchema }]),
  ],
  providers: [SalesRepository],
  exports: [SalesRepository],
})
export class SalesDataModule {}
