import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountDataModule } from 'src/database/account-data/account-data.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { ClientLocalProviderStrategy } from './strategies/client-local-provider.strategy';
import { ClientLocalConsumerStrategy } from './strategies/client-local-consumer.strategy';
import { ClientJwtStrategy } from './strategies/client-jwt.strategy';
import { GoogleProviderStrategy } from './strategies/google-provider.strategy';
import { GoogleConsumerStrategy } from './strategies/google-consumer.strategy';
import { MailModule } from 'src/mail/mail.module';
import { NaverProviderStrategy } from './strategies/naver-provider.strategy';
import { NaverConsumerStrategy } from './strategies/naver-consumer.strategy';
import { AppleProviderStrategy } from './strategies/apple-provider.strategy';
import { AppleConsumerStrategy } from './strategies/apple-consumer.strategy';

@Module({
  imports: [
    AccountDataModule,
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('CLIENT_JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    FileUploadModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // Strategy
    ClientLocalProviderStrategy,
    ClientLocalConsumerStrategy,
    ClientJwtStrategy,
    GoogleProviderStrategy,
    GoogleConsumerStrategy,
    NaverProviderStrategy,
    NaverConsumerStrategy,
    AppleProviderStrategy,
    AppleConsumerStrategy,
  ],
})
export class AuthModule {}
