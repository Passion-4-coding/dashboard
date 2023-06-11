import { default as _axios } from "axios";

const axiosApiInstance = _axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axios = axiosApiInstance;
