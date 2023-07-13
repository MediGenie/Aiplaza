import { ApiErrorFactory } from "../api-error";
import { axiosInstance } from "../instance";

async function orderReady(service_id: string) {
  const url = "/order/ready";
  try {
    const response = await axiosInstance.post(url, {
      service: service_id,
    });
    return response.data as {
      merchant_uid: string;
      price: number;
      product_name: string;
      buyer_name: string;
      buyer_email: string;
    };
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}
export const orderApis = { orderReady };
