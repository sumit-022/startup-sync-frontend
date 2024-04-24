import instance from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("BASE_URL is not defined");
}
const axios = instance.create({
  withCredentials: true,
  baseURL: `${baseUrl}/api`,
  timeout: 10000,
});

export default axios;
