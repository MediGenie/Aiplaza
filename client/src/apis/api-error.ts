import axios from 'axios';

export class ApiError extends Error {
  type: string;
  constructor(msg: string, type: string = 'NORMAL') {
    super(msg);
    this.type = type;
  }
}
export function ApiErrorFactory(e: any) {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      const data = e.response.data;
      if (typeof data === 'string') {
        return new ApiError(data);
      }
      const { type, message } = e.response.data;
      return new ApiError(message, type);
    } else if (e.request) {
      return new ApiError('요청이 적절하지 않습니다.');
    }
  }
  return new ApiError('네트워크 연결에 실패하였습니다.');
}
