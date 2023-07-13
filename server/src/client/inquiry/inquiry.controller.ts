import { Body, Post } from '@nestjs/common';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { InquiryService } from './inquiry.service';
import { InquiryType } from './inquiry.type';

@ClientController('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}
  @Post('/sendinquire')
  sendInQuiry(@Body() body: InquiryType) {
    return this.inquiryService.sendInQuiry(body);
  }
}
