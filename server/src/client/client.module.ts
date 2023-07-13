import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { OrderModule } from './order/order.module';
import { MypageModule } from './mypage/mypage.module';
import { BoardModule } from './board/board.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { RequestModule } from './request/request.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthModule,
    ServiceModule,
    OrderModule,
    MypageModule,
    BoardModule,
    InquiryModule,
    RequestModule,
    CommonModule,
  ],
})
export class ClientModule {}
