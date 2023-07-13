import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { MailModule } from './mail/mail.module';
import { RenderModule } from './render/render.module';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFile,
    }),
    DatabaseModule,
    AdminModule,
    ClientModule,
    MailModule,
    RenderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
