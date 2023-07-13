import Axios from 'axios';

export default class BaseService {
  apiName;
  modalDispatch = undefined;

  constructor(apiName) {
    this.apiName = apiName;
  }
  create = async (body = {}) => {
    await Axios.post(`/${this.apiName}`, body, {
      headers: { Pragma: 'no-cache' },
    });
    return null;
  };
  getOne = async (id) => {
    const response = await Axios.get(`/${this.apiName}/${id}`, {
      headers: { Pragma: 'no-cache' },
    });
    const row = response.data;
    if (!row) {
      throw new Error('row-is-empty');
    }
    return row;
  };
  getMany = async (search) => {
    const fetchUrl = `/${this.apiName}${search}`;
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
  update = async (id, data) => {
    const response = await Axios.patch(`/${this.apiName}/${id}`, data);
    return response.data;
  };
  delete = async (id) => {
    const deleteURl = `/${this.apiName}/${id}`;
    await Axios.delete(deleteURl);
  };
  deleteMany = async (ids) => {
    const deleteURl = `/${this.apiName}`;
    await Axios.delete(deleteURl, { data: { rows: ids } });
  };
}

export const changeOrderServiceFactory = (apiName) =>
  class extends BaseService {
    constructor() {
      super(apiName);
    }
    async changeOrder(id, to) {
      const url = `/${this.apiName}/${id}/order`;
      await Axios.patch(url, { to });
    }
  };
