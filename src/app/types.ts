export enum ApiStatuses {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  fail = 'fail',
} 

export type Colors = "gray" | "red" | "yellow" | "green" | "violet" | "orange";
export type SortTypes = "ascend" | "descend" | "none";

export interface IApiList<Type> {
  total: number;
  list: Type[];
}

export interface IPaginationProps {
  page: number;
  pageSize: number;
}

export interface IDateRange {
  start: Nullable<Date>,
  end: Nullable<Date>,
}

export type Nullable<T> = T | null;