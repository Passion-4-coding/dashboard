import { AxiosPromise } from "axios";
import { ITelegramMember } from "./types";
import { axios } from "../axios";
import { IApiList, IPaginationProps } from "../../app/types";

export const getTelegramMembers = (pagination: IPaginationProps): AxiosPromise<IApiList<ITelegramMember>> => {
  return axios.get(`/telegram-members?page=${pagination.page}&pageSize=${pagination.pageSize}`);
}

export const updateTelegramMemberActive = (id: string, active: boolean): AxiosPromise<ITelegramMember> => {
  return axios.patch(`/telegram-members/${id}`, { active });
}