import axios from 'axios';
import BaseService from './base.service';

export default class StaffService extends BaseService {
  constructor() {
    super('staff');
  }
  getOne = async (id, otp_token) => {
    const opts = otp_token
      ? { headers: { Pragma: 'no-cache', 'x-certificate-token': otp_token } }
      : { headers: { Pragma: 'no-cache' } };
    const response = await axios.get(`/${this.apiName}/${id}`, opts);
    const row = response.data;
    if (!row) {
      throw new Error('row-is-empty');
    }
    return row;
  };
}
