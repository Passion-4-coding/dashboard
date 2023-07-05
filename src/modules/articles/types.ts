import { ApiStatuses, IPaginationProps } from "../../app/types";

export type TArticleLanguage = "ua" | "en";

export interface IArticle {
  _id: string;
  createdOn: string;
  updatedOn: string;
  publishedOn: Date;
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
  publishedOn: Date;
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

export interface IArticleFormValues extends IArticleBaseFormValues, IArticleLanguageFormValues {}

export interface IArticlesSliceState {
  list: IArticleSimple[];
  articlesBySlug?: IArticle[];
  status: ApiStatuses;
  articlesBySlugStatus: ApiStatuses;
  pagination: IPaginationProps;
  total: number;
}