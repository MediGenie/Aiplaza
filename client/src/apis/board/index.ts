import { ApiErrorFactory } from '../api-error';
import { axiosInstance } from '../instance';

interface RouteState {
  _id: string;
}

async function getBoard(page: number) {
  const url = `/board?page=${page}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getOneBoard(id: RouteState) {
  const url = `/board/${id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

export const boardApis = { getBoard, getOneBoard };
