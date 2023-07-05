import { AxiosPromise } from "axios";
import { IArticle, IArticleFormValues, IArticleSimple } from "./types";
import { axios } from "../axios";
import { IApiList, IPaginationProps } from "../../app/types";

export const getArticles = (pagination: IPaginationProps): AxiosPromise<IApiList<IArticleSimple>> => {
  return axios.get(`/articles?page=${pagination.page}&pageSize=${pagination.pageSize}`);
}

export const getArticlesBySlug = (slug: string): AxiosPromise<IArticle[]> => {
  return axios.get(`/articles/${slug}`);
}

export const createArticle = (article: IArticleFormValues): AxiosPromise<IArticle> => {
  return axios.post(`/articles`, article);
}

export const updateArticle = (id: string, article: IArticleFormValues): AxiosPromise<IArticle> => {
  return axios.patch(`/articles/${id}`, article);
}