import { User, UserType } from "../../auth/type";
import { axiosInstance } from "../instance";
import { ApiErrorFactory } from "../api-error";
import { SocialType } from "../../types/social.type";

async function login(
  username: string,
  password: string,
  type: UserType,
  isPersist: boolean
): Promise<User> {
  const url = `/auth/sign-in/${type.toLowerCase()}`;
  try {
    const response = await axiosInstance.post(url, {
      username,
      password,
      isPersist,
    });

    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function getAccessToken(): Promise<string> {
  const url = "/auth/access-token";
  try {
    const response = await axiosInstance.post(url);

    return response.data.access_token;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function loadUserInfo(
  access_token?: string
): Promise<Omit<User, "access_token">> {
  const url = "/auth/me";
  try {
    const opts =
      typeof access_token === "string"
        ? {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        : undefined;

    const response = await axiosInstance.get(url, opts);
    return response.data;
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function logout(): Promise<void> {
  const url = "/auth/sign-out";
  try {
    await axiosInstance.post(url);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}
async function withdrawl(): Promise<void> {
  const url = "/auth/withdrawl";
  try {
    await axiosInstance.post(url);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}
async function signUpCredential(body: {
  name: string;
  email: string;
  password: string;
  type: UserType;
  user_type: "개인" | "법인" | "단체";
  tel: string;
  country: string;
  private_term: boolean;
  service_term: boolean;
  biz_cert: File;
  address: string;
  address_detail: string;
  research_field: string;
  analysis_field: string;
}): Promise<void> {
  const fd = new FormData();

  fd.append("type", body.type);
  fd.append("name", body.name);
  fd.append("email", body.email);
  fd.append("password", body.password);
  fd.append("user_type", body.user_type);
  fd.append("tel", body.tel);
  fd.append("country", body.country);
  fd.append("biz_cert", body.biz_cert);
  fd.append("address", body.address);
  fd.append("address_detail", body.address_detail);
  fd.append("research_field", body.research_field);
  fd.append("analysis_field", body.analysis_field);

  const url = "/auth/sign-up";

  try {
    await axiosInstance.post(url, fd);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function socialSignUpCredential(body: {
  name: string;
  type: UserType;
  user_type: "개인" | "법인" | "단체";
  tel: string;
  country: string;
  private_term: boolean;
  service_term: boolean;
  biz_cert: File;
  address: string;
  address_detail: string;
  research_field: string;
  analysis_field: string;
  social_key: string;
  social_method: string;
  email: string;
}): Promise<void> {
  const fd = new FormData();

  fd.append("type", body.type);
  fd.append("name", body.name);
  fd.append("user_type", body.user_type);
  fd.append("tel", body.tel);
  fd.append("country", body.country);
  fd.append("biz_cert", body.biz_cert);
  fd.append("address", body.address);
  fd.append("address_detail", body.address_detail);
  fd.append("research_field", body.research_field);
  fd.append("analysis_field", body.analysis_field);
  fd.append("social_key", body.social_key);
  fd.append("social_method", body.social_method);
  fd.append("email", body.email);
  const url = "/auth/social-sign-up";

  try {
    await axiosInstance.post(url, fd);
  } catch (e) {
    throw ApiErrorFactory(e);
  }
}

async function signUpSocial(opts: {
  id: string;
  type: SocialType;
  account_type: "provider" | "consumer";
  isPersist: boolean;
}): Promise<User> {
  try {
    const response = await axiosInstance.post(
      `/auth/sign-in/${opts.account_type}/social`,
      {
        id: opts.id,
        type: opts.type,
        isPersist: opts.isPersist,
      }
    );
    return response.data;
  } catch (e: any) {
    throw ApiErrorFactory(e);
  }
}

async function resetPassword(opts: { email: string; type: UserType }) {
  try {
    await axiosInstance.patch(`/auth/reset-pw/${opts.type.toLowerCase()}`, {
      email: opts.email,
    });
  } catch (e: any) {
    throw ApiErrorFactory(e);
  }
}

export const authApis = {
  login,
  getAccessToken,
  loadUserInfo,
  logout,
  signUpCredential,
  signUpSocial,
  resetPassword,
  socialSignUpCredential,
  withdrawl,
};
