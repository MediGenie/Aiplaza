import { ApiErrorFactory } from "../api-error";
import { axiosInstance } from "../instance";

interface RouteState {
  _id: string;
}

async function getRequestList(page: number, sort?: string, search?: string) {
  const url = `/consumer/request/list?page=${page}&sort=${sort}&search=${search}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e: any) {
    throw ApiErrorFactory(e);
  }
}

async function getRequestResult(id: RouteState) {
  const url = `/consumer/request/result/`;
  try {
    const response = await axiosInstance.post(url, { id });
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getRequestResponse(id: RouteState) {
  const url = `/common/request/response`;
  try {
    const response = await axiosInstance.post(url, id);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

export const consumerRequestApis = {
  getRequestList,
  getRequestResult,
};

export const AllUserRequestApis = {
  getRequestResponse,
};
