import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const from_mail = configService.getOrThrow('MAIL_FROM_EMAIL');
        const from_pw = configService.getOrThrow('MAIL_FROM_EMAIL_PASSWORD');
        const from_name = configService.getOrThrow('MAIL_FROM_NAME');
        return {
          transport: {
            service: 'gmail',
            auth: {
              user: from_mail,
              pass: from_pw,
            },
          } as SMTPTransport.Options,
          defaults: {
            from: `"${from_name}" <${from_mail}>`,
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
