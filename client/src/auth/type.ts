import { SocialType } from "../types/social.type";

export type AuthContextValueType = {
  user: User | null;
};
export interface AuthContextDispatchType {
  login: (
    username: string,
    password: string,
    type: UserType,
    isPersist: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string>;
  loadUserInfo: () => Promise<Omit<User, "access_token">>;
  socialLogin: (
    id: string,
    social_type: SocialType,
    type: "provider" | "consumer",
    isPersist: boolean,
    email?: string
  ) => Promise<void>;
}

export type User = ProviderUser | ConsumerUser;

export enum UserType {
  PROVIDER = "Provider",
  CONSUMER = "Consumer",
}

export type ProviderUser = {
  _id: string;
  email: string;
  name: string;
  tel: string;
  type: UserType.PROVIDER;
  access_token: string;
};
export type ConsumerUser = {
  _id: string;
  email: string;
  name: string;
  tel: string;
  type: UserType.CONSUMER;
  access_token: string;
};
