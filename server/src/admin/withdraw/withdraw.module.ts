import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { Account, AccountSchema } from 'src/database/schema/account.schema';
import { WithdrawController } from './withdraw.controller';
import { WithdrawService } from './withdraw.service';

@Module({
  imports: [
    AccountDataModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [WithdrawController],
  providers: [WithdrawService],
})
export class WithdrawModule {}
