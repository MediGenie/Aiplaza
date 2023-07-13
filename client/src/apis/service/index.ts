import { templateIdEnum } from "../../components/PageEditor/enum/template-id";
import { ServiceFormColumn } from "../../components/ServiceFormEditor/types";
import { PageSectionType } from "../../types/page-section.type";
import { ApiErrorFactory } from "../api-error";
import { axiosInstance } from "../instance";

async function create(body: FormData) {
  const url = "/provider/service";
  try {
    await axiosInstance.post(url, body);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function update(id: string, body: FormData) {
  const url = `/provider/service/${id}`;
  try {
    await axiosInstance.patch(url, body);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

export type GetServicePageResponse = {
  service_id: string;
  owner: string;
  service_content: {
    title: string;
    thumbnail: string;
    description: string;
    email: string;
    average_rate: number;
    price: number;
  };
  page: {
    template: templateIdEnum;
    data: PageSectionType[];
  };
  reviews: {
    total: number;
    rows: {
      _id: string;
      rate: number;
      email: string;
      created_at: string;
      review: string;
    }[];
  };
};

const getServicePageFactory =
  (type: "provider" | "consumer") => async (id: string) => {
    const url = `/${type}/service/${id}`;
    try {
      const response = await axiosInstance.get(url);
      return response.data as GetServicePageResponse;
    } catch (e) {
      throw ApiErrorFactory(e);
    }
  };

async function getServiceList(page: number, sort?: string, search?: string) {
  const url = `/consumer/service/list?page=${page}&search=${search}&sort=${sort}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as any;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getServiceFullData(id: string) {
  const url = `/provider/service/${id}/full`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as any;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getProviderServiceList(
  page: number,
  sort?: string,
  search?: string,
  user_id?: string | undefined
) {
  const url = `/provider/service/list?page=${page}&search=${search}&sort=${sort}&num=${user_id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as any;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getProviderBookMarkList(user_id: string | undefined) {
  const url = `/provider/service/bookmark/${user_id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getProviderFullBookMark(user_id: string | undefined) {
  const url = `/provider/service/bookmark/list/${user_id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function createProviderBookMark(
  user_id: string | undefined,
  service_id: string
) {
  const body = {
    user_id: user_id,
    service_id: service_id,
  };
  const url = `/provider/service/bookmark`;
  try {
    const response = await axiosInstance.post(url, body);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

export type GetServiceFormResponse = {
  service_id: string;
  content: {
    thumbnail: string;
    title: string;
    description: string;
  };
  form: {
    label: string;
    description: string;
    column: ServiceFormColumn[];
  }[];
};

async function getServiceForm(id: string) {
  const url = `/consumer/service/${id}/form`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as GetServiceFormResponse;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function createBookMark(user_id: string | undefined, service_id: string) {
  const body = {
    user_id: user_id,
    service_id: service_id,
  };
  const url = `/consumer/service/bookmark`;
  try {
    const response = await axiosInstance.post(url, body);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getBookMarkList(user_id: string | undefined) {
  const url = `/consumer/service/bookmark/${user_id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getFullBookMark(user_id: string | undefined) {
  const url = `/consumer/service/bookmark/list/${user_id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function hasServiceTicket(id: string) {
  const url = `/consumer/service/${id}/ticket`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as string | null;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function useService(data: FormData) {
  const url = `/consumer/service/use`;
  try {
    await axiosInstance.post(url, data);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function checkServiceResult(ticket_id: string) {
  const url = `/consumer/service/check-result/${ticket_id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as boolean;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function sendInQuire(
  consumerEmail: string,
  providerEmail: string,
  inquire: string,
  serviceTitle: string | undefined
) {
  try {
    await axiosInstance.post(`/inquiry/sendinquire/`, {
      consumerEmail: consumerEmail,
      providerEmail: providerEmail,
      inquire: inquire,
      serviceTitle: serviceTitle,
    });
  } catch (e: any) {
    throw ApiErrorFactory(e);
  }
}

async function getProviderServiceResultList(
  id: string | undefined,
  page: number,
  sort: string,
  search: string
) {
  const _id = id?.trim();
  const url = `/provider/service/${_id}/result?page=${page}&search=${search}&sort=${sort}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data as any;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

export const consumerServiceApis = {
  getServicePage: getServicePageFactory("consumer"),
  getServiceForm,
  hasServiceTicket,
  useService,
  checkServiceResult,
  getServiceList,
  createBookMark,
  getBookMarkList,
  getFullBookMark,
  sendInQuire,
};

export const providerServiceApis = {
  create,
  update,
  getServicePage: getServicePageFactory("provider"),
  getServiceFullData,
  getProviderServiceResultList,
  getProviderServiceList,
  getProviderBookMarkList,
  getProviderFullBookMark,
  createProviderBookMark,
};
