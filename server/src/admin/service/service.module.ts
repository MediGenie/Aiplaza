import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { Account, AccountSchema } from 'src/database/schema/account.schema';
import { ServiceDataModule } from 'src/database/service-data/service-data.module';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    AccountDataModule,
    ServiceDataModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
