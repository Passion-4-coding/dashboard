import { AxiosPromise } from "axios";
import { axios } from "../axios"
import { IAuthUser } from "./types";

export const getToken = (code: string): AxiosPromise<string> => {
  return axios.get(`/auth?code=${code}`);
}

export const getUser = (): AxiosPromise<IAuthUser> => {
  return axios.get(`/user`);
}