import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAMPORT_OPTIONS } from './constants';

interface PaymentCancelAnnotation {
  pg_tid: string;
  amount: number;
  cancelled_at: number;
  reason: string;
  receipt_url: string;
}

interface PaymentAnnotation {
  imp_uid: string;
  merchant_uid: string;
  pay_method: string;
  channel: string;
  pg_provider: string;
  emb_pg_provider: string;
  pg_tid: string;
  pg_id: string;
  escrow: boolean;
  apply_num: string;
  bank_code: string;
  bank_name: string;
  card_code: string;
  card_name: string;
  card_quota: number;
  card_number: string;
  card_type: number;
  vbank_code: string;
  vbank_name: string;
  vbank_num: string;
  vbank_holder: string;
  vbank_date: number;
  vbank_issued_at: number;
  name: string;
  amount: number;
  cancel_amount: number;
  currency: string;
  buyer_name: string;
  buyer_email: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
  custom_data: string;
  user_agent: string;
  status: string;
  started_at: number;
  paid_at: number;
  failed_at: number;
  cancelled_at: number;
  fail_reason: string;
  cancel_reason: string;
  receipt_url: string;
  cancel_history: Array<PaymentCancelAnnotation>;
  cancel_receipt_urls: Array<string>;
  cash_receipt_issued: boolean;
  customer_uid: string;
  customer_uid_usage: string;
}

@Injectable()
export class IamportService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(IAMPORT_OPTIONS)
    private readonly opts: {
      imp_key: string;
      imp_secret: string;
    },
  ) {}

  private async getHeader() {
    const getToken = await this.httpService.axiosRef.post(
      'https://api.iamport.kr/users/getToken',
      { imp_key: this.opts.imp_key, imp_secret: this.opts.imp_secret },
      { headers: { 'Content-Type': 'application/json' } },
    );
    const { access_token } = getToken.data.response;
    return {
      Authorization: access_token,
    };
  }

  async getPaymentData(imp_uid: string) {
    try {
      const headers = await this.getHeader();
      const getPaymentData = await this.httpService.axiosRef.get(
        `https://api.iamport.kr/payments/${imp_uid}`,
        { headers: headers },
      );
      const paymentData = getPaymentData.data.response; // 조회한 결제 정보
      return paymentData as PaymentAnnotation;
    } catch {
      throw new BadRequestException('결제 정보를 불러올 수 없습니다.');
    }
  }

  async requestPaymentCancel(imp_uid: string, reason = '') {
    const headers = await this.getHeader();
    const response = await this.httpService.axiosRef.post(
      `http://api.iamport.kr/payments/cancel`,
      {
        imp_uid,
        reason,
      },
      {
        headers,
      },
    );
    return response.data as PaymentAnnotation;
  }
}
