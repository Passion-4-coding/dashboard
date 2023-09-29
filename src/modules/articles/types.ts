import { ApiStatuses, IPaginationProps } from "../../app/types";
import { IMember } from "../members";

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
  author: IMember;
  tags: IArticleTag[];
}

export interface IArticleSimple {
  _id: string;
  createdOn: string;
  updatedOn: string;
  titleCompact: string;
  pending: boolean;
  active: boolean;
  slug: string;
}

export interface IArticleFormValues {
  slug: string;
  publishedOn: Date;
  pending: boolean;
  active: boolean;
  language: TArticleLanguage;
  title: string;
  content: string;
  titleCompact: string;
  contentCompact: string;
  titleSeo: string;
  descriptionSeo: string;
  keywordsSeo: string;
  author: string;
  tags: string[];
}

export interface IArticlesSliceState {
  list: IArticleSimple[];
  tags: IArticleTag[];
  tagsForSearch: IArticleTag[];
  article?: IArticle;
  status: ApiStatuses;
  tagsStatus: ApiStatuses;
  tagStatus: ApiStatuses;
  tagsForSearchStatus: ApiStatuses;
  articleStatus: ApiStatuses;
  pagination: IPaginationProps;
  tagsPagination: IPaginationProps;
  total: number;
  tagsTotal: number;
  tag?: IArticleTag;
}

export interface IArticleTag {
  _id: string;
  createdOn: string;
  updatedOn: string;
  name: string;
  active: boolean;
}

export interface ICreateTagValues {
  name: string;
  active: boolean;
}