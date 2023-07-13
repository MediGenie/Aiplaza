import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { StaffModule } from './staff/staff.module';
import { MeModule } from './me/me.module';
import { PermissionModule } from './permission/permission.module';
import { ProviderModule } from './provider/provider.module';
import { CustomerModule } from './customer/customer.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { ServiceModule } from './service/service.module';
import { BoardModule } from './board/board.module';
import { PaymentModule } from './payment/payment.module';
import { SalesService } from './sales/sales.service';
import { SalesController } from './sales/sales.controller';
import { SalesModule } from './sales/sales.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    AuthModule,
    StaffModule,
    MeModule,
    PermissionModule,
    ProviderModule,
    CustomerModule,
    WithdrawModule,
    ServiceModule,
    PaymentModule,
    BoardModule,
    SalesModule,
    HomeModule,
  ],
  providers: [],
})
export class AdminModule {}
