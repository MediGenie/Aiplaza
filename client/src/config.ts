const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:5001"
    : // TODO: 도메인 변경 필요
      "www.aiplaza.co.kr";
const BASE_API_URL = `${BASE_URL}/apis/c`;

export const config = {
  BASE_API_URL,
  BASE_URL,
};
