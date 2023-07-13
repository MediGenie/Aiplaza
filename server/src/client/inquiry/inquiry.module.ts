import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';

@Module({
  imports: [MailModule],
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class InquiryModule {}
