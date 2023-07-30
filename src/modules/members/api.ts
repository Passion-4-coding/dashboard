import { AxiosPromise } from "axios";
import { IMember, IMembersListFilters } from "./types";
import { axios } from "../axios";
import { IApiList, IPaginationProps } from "../../app/types";

const getFilters = (filters: Partial<IMembersListFilters>) => {
  let query = ""
  if (filters.memberId) {
    query = `${query}&type=${filters.memberId}`;
  }
  return query;
}

export const getMembers = (pagination: IPaginationProps, filters: Partial<IMembersListFilters>): AxiosPromise<IApiList<IMember>> => {
  return axios.get(`/members?page=${pagination.page}&pageSize=${pagination.pageSize}${getFilters(filters)}`);
}
