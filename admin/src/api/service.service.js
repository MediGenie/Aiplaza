import BaseService from './base.service';
import Axios from 'axios';

export default class ServiceService extends BaseService {
  constructor() {
    super('service');
  }

  getMinorCategoryList = async (id, page) => {
    const fetchUrl = `/${this.apiName}/${id}/minor?page=${page}`;
    const response = await Axios.get(fetchUrl, {
      headers: { Pragma: 'no-cache' },
    });
    const { rows, ...meta } = response.data;

    return {
      data: rows,
      totalPages: Math.ceil(meta?.total_number / meta?.page_size),
      total_number: meta.total_number,
    };
  };
}
