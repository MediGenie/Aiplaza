import BaseService from './base.service';
import Axios from 'axios';

export default class CustomerstoryDownloadService extends BaseService {
  constructor() {
    super('customer-story-download');
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
