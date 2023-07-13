import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { InquiryType } from './inquiry.type';

@Injectable()
export class InquiryService {
  constructor(private readonly mailService: MailService) {}
  sendInQuiry(body: InquiryType) {
    const consumerEmail = body.consumerEmail;
    const providerEmail = body.providerEmail;
    const inquiry = body.inquire;
    const serviceTitle = body.serviceTitle;
    return this.mailService.sendInQuiry(
      consumerEmail,
      providerEmail,
      inquiry,
      serviceTitle,
    );
  }
}
