import BaseService from './base.service';
import Axios from 'axios';

export default class InquiryService extends BaseService {
  constructor() {
    super('inquiry');
  }
  getOne = async (id, otp_token) => {
    const opts = otp_token
      ? { headers: { Pragma: 'no-cache', 'x-certificate-token': otp_token } }
      : { headers: { Pragma: 'no-cache' } };
    const response = await Axios.get(`/${this.apiName}/${id}`, opts);
    const row = response.data;
    if (!row) {
      throw new Error('row-is-empty');
    }
    return row;
  };
}
