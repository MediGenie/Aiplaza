import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentDataModule } from 'src/database/payment-data/payment-data.module';
import { IamportModule } from 'src/iamport/iamport.module';
import { OrderHooksController } from './order-hooks.controller';
import { OrderHooksService } from './order-hooks.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    PaymentDataModule,
    IamportModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          imp_key: configService.getOrThrow('imp_key'),
          imp_secret: configService.getOrThrow('imp_secret'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [OrderService, OrderHooksService],
  controllers: [OrderController, OrderHooksController],
})
export class OrderModule {}
