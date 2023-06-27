import { ApiStatuses, IPaginationProps } from "../../app/types";

export type TArticleLanguage = "ua" | "en" | "ru";

export interface IArticle {
  _id: string;
  createdOn: string;
  updatedOn: string;
  publishedOn: string;
  slug: string;
  language: TArticleLanguage;
  title: string;
  content: string;
  image?: string;
  titleCompact: string;
  contentCompact: string;
  titleSeo: string;
  descriptionSeo: string;
  keywordsSeo: string;
  pending: boolean;
  active: boolean;
}

export interface IArticleSimple {
  _id: string;
  createdOn: string;
  updatedOn: string;
  titleCompact: string;
  pending: boolean;
  active: boolean;
}

export interface IArticleBaseFormValues {
  slug: string;
  publishedOn: string;
  pending: boolean;
  active: boolean;
}

export interface IArticleLanguageFormValues {
  language: TArticleLanguage;
  title: string;
  content: string;
  titleCompact: string;
  contentCompact: string;
  titleSeo: string;
  descriptionSeo: string;
  keywordsSeo: string;
}

export interface IArticlesSliceState {
  list: IArticleSimple[];
  status: ApiStatuses;
  pagination: IPaginationProps;
  total: number;
}