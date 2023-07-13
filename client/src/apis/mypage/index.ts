import { PaginateData } from "../../types/paginate-data.interface";
import { PaymentListItem } from "../../types/payment";
import { ServiceListItem, ServicePaginateData } from "../../types/service";
import {
  WithDrawPaginateData,
  WithDrawListItem,
} from "../../types/withdraw.type";
import { ApiErrorFactory } from "../api-error";
import { axiosInstance } from "../instance";

// interface MyInfo extends PathMyInfo {
//   user_type: '개인' | '법인' | '단체';
// }

interface PathMyInfo {
  user_type: string;
  name: string;
  tel: string;
  country: string;
  research_field: string;
  analysis_field: string;
  address: string;
  address_detail: string;
}

interface ServiceInfo {
  interest_disease: string;
  interest_field: string;
  interest_video_mobility: string;
  interest_grade: string;
  biz_name: string;
  biz_regist_cert_file: File;
  forecasts_number_per_month: string;
}

interface ProviderServiceInfo {
  type: string;
  domain_field: string;
  biz_type: string;
  service_type: string;
  service_subject: string;
  service_range: string;
  model_type: string;
  algorithm_program_type: string;
}

async function getMyInfo() {
  const url = "/mypage";
  try {
    const response = await axiosInstance.get(url);
    return response.data as PathMyInfo;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function patchMyInfo(body: PathMyInfo) {
  const url = "/mypage";
  try {
    await axiosInstance.patch(url, body);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function changePassword(body: { password: string }) {
  const url = "/mypage/change-password";
  try {
    await axiosInstance.patch(url, body);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getServiceInfo() {
  const url = "/mypage/get-service-info";
  try {
    const response = await axiosInstance.get(url);
    return response.data as ServiceInfo;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function changeServiceInfo(body: {
  interest_disease?: string;
  interest_field?: string;
  interest_video_mobility?: string;
  interest_grade?: string;
  biz_name?: string;
  biz_regist_cert_file?: File | null;
  forecasts_number_per_month?: string;
}) {
  const formdata = new FormData();
  if (body.interest_disease) {
    formdata.append("interest_disease", body.interest_disease);
  }
  if (body.interest_field) {
    formdata.append("interest_field", body.interest_field);
  }
  if (body.interest_video_mobility) {
    formdata.append("interest_video_mobility", body.interest_video_mobility);
  }
  if (body.interest_grade) {
    formdata.append("interest_grade", body.interest_grade);
  }
  if (body.biz_name) {
    formdata.append("biz_name", body.biz_name);
  }
  if (
    body.biz_regist_cert_file !== null &&
    body.biz_regist_cert_file instanceof File
  ) {
    formdata.append("biz_regist_cert_file", body.biz_regist_cert_file);
  }
  if (body.forecasts_number_per_month) {
    formdata.append(
      "forecasts_number_per_month",
      body.forecasts_number_per_month
    );
  }
  const url = "/mypage/change-service-info";
  try {
    await axiosInstance.patch(url, formdata);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function withdrawl() {
  const url = "/mypage/withdrawl";
  try {
    await axiosInstance.get(url);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getPaymentList(page: number, order: string) {
  const url = `/mypage/payment?page=${page}&order=${order}`;
  const response = await axiosInstance.get(url);
  return response.data as PaginateData<PaymentListItem>;
}

async function orderCancel(id: string, refundReason: string) {
  try {
    const url = "/mypage/order-cancel";
    const data = {
      id,
      refundReason,
    };
    await axiosInstance.patch(url, data);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function review(paymentId: string, ratingValue: number, review: string) {
  const url = "/mypage/review";
  const data = {
    paymentId,
    ratingValue,
    review,
  };
  try {
    await axiosInstance.patch(url, data);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function changeProviderServiceInfo(body: {
  type?: string;
  domain_field?: string;
  biz_type?: string;
  service_type?: string;
  service_subject?: string;
  service_range?: string;
  model_type?: string;
  algorithm_program_type?: string;
}) {
  const url = "/mypage/change-provider-service-info";
  try {
    await axiosInstance.patch(url, body);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getProviderServiceInfo() {
  const url = "/mypage/get-provider-service-info";
  try {
    const response = await axiosInstance.get(url);
    return response.data as ProviderServiceInfo;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getServiceList(page: number) {
  const url = `/mypage/service?page=${page}`;
  const response = await axiosInstance.get(url);
  return response.data as ServicePaginateData<ServiceListItem>;
}

async function getWithDrawList(page: number) {
  const url = `/mypage/withdraw?page=${page}`;
  const response = await axiosInstance.get(url);
  return response.data as WithDrawPaginateData<WithDrawListItem>;
}

export const mypageApis = {
  getMyInfo,
  patchMyInfo,
  changePassword,
  getServiceInfo,
  changeServiceInfo,
  withdrawl,
  getPaymentList,
  orderCancel,
  review,
  changeProviderServiceInfo,
  getProviderServiceInfo,
  getServiceList,
  getWithDrawList,
};
