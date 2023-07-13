import { MailerService } from '@nest-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { AccountType } from 'src/database/schema/account.schema';
import { mailTemplate } from './reset-mail.template';
import { inquiryMailTemplate } from './send-inquiry-mail.template';

@Injectable()
export class MailService {
  logger = new Logger('MailService');
  constructor(private readonly mailerService: MailerService) {}

  async sendAuthPwMail(user_email: string, temp_password: string) {
    if (process.env.NODE_ENV === 'production') {
      const title = `AI Plaza 관리자 비밀번호 재설정 안내`;
      const content = mailTemplate
        .replace('${USER_TYPE}', '관리자')
        .replace('${USER_EMAIL}', user_email)
        .replace('${NEXT_PASSWORD}', temp_password);
      await this.mailerService
        .sendMail({
          to: user_email,
          subject: title,
          html: content,
        })
        .then(() => {
          this.logger.log(`메일 전송 완료, to: ${user_email}}`);
        })
        .catch((e) => {
          this.logger.log(`메일 전송 실패, to: ${user_email}}`);
          this.logger.error(e);
        });
    } else {
      this.logger.log('개발 모드에서는 메일을 실제로 전송하지 않습니다.');
      this.logger.log(`변경된 비밀번호는 ${temp_password} 입니다.`);
    }
  }

  async sendUserPwMail(
    user_email: string,
    user_type: AccountType,
    temp_password: string,
  ) {
    const title = `AI Plaza 비밀번호 재설정 안내`;
    const content = mailTemplate
      .replace(
        '${USER_TYPE}',
        user_type === AccountType.PROVIDER ? '서비스 제공자' : '일반',
      )
      .replace('${USER_EMAIL}', user_email)
      .replace('${NEXT_PASSWORD}', temp_password);

    if (process.env.NODE_ENV === 'production') {
      await this.mailerService
        .sendMail({
          to: user_email,
          subject: title,
          html: content,
        })
        .then(() => {
          this.logger.log(`메일 전송 완료, to: ${user_email}}`);
        })
        .catch((e) => {
          this.logger.log(`메일 전송 실패, to: ${user_email}}`);
          this.logger.error(e);
        });
    } else {
      this.logger.log('개발 모드에서는 메일을 실제로 전송하지 않습니다.');
      this.logger.log(`변경된 비밀번호는 ${temp_password} 입니다.`);
    }
  }

  async sendInQuiry(
    consumerEmail: string,
    providerEmail: string,
    inquiry: string,
    serviceTitle: string,
  ) {
    const title = `AI Plaza ${serviceTitle}의 문의내용 안내`;
    const content = inquiryMailTemplate
      .replace('${SERVICE_TITLE}', serviceTitle)
      .replace('${CONSUMER_EMAIL}', consumerEmail)
      .replace('${PROVIDER_EMAIL}', providerEmail)
      .replace('${INQUIRY_CONTENT}', inquiry);
    if (process.env.NODE_ENV === 'production') {
      await this.mailerService
        .sendMail({
          to: providerEmail,
          subject: title,
          html: content,
        })
        .then(() => {
          this.logger.log(`메일 전송 완료, to: ${providerEmail}}`);
        })
        .catch((e) => {
          this.logger.log(`메일 전송 실패, to: ${providerEmail}}`);
          this.logger.error(e);
        });
    } else {
      this.logger.log('개발 모드에서는 메일을 실제로 전송하지 않습니다.');
      this.logger.log(`문의 내용은 ${inquiry} 입니다.`);
    }
  }
}
