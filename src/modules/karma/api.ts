import { AxiosPromise } from "axios";
import { ICreateKarmaEntryValues, IKarmaEntriesFilters, IKarmaEntry, ITelegramMember } from "./types";
import { axios } from "../axios";
import { IApiList, IPaginationProps } from "../../app/types";

const getFilters = (filters: Partial<IKarmaEntriesFilters>) => {
  let query = ""
  if (filters.from && filters.to) {
    query = `${query}&from=${filters.from}&to=${filters.to}`;
  }
  if (filters.type) {
    query = `${query}&type=${filters.type}`;
  }
  return query;
}

export const getEntries = (pagination: IPaginationProps, filters: Partial<IKarmaEntriesFilters>): AxiosPromise<IApiList<IKarmaEntry>> => {
  return axios.get(`/karma-entries?page=${pagination.page}&pageSize=${pagination.pageSize}${getFilters(filters)}`);
}

export const addEntry = (entry: ICreateKarmaEntryValues) => {
  return axios.put(`/karma-entries`, entry);
}

export const updateEntry = (id: string, entry: Partial<ICreateKarmaEntryValues>) => {
  return axios.patch(`/karma-entries/${id}`, entry);
}

export const getTelegramMembers = (pagination: IPaginationProps): AxiosPromise<IApiList<ITelegramMember>> => {
  return axios.get(`/telegram-members?page=${pagination.page}&pageSize=${pagination.pageSize}`);
}

export const updateTelegramMemberActive = (id: string, active: boolean): AxiosPromise<ITelegramMember> => {
  return axios.patch(`/telegram-members/${id}`, { active });
}