import { AxiosPromise } from "axios";
import { IArticle, IArticleFormValues, IArticleSimple, IArticleTag, ICreateTagValues } from "./types";
import { axios } from "../axios";
import { IApiList, IPaginationProps } from "../../app/types";

export const getArticles = (pagination: IPaginationProps): AxiosPromise<IApiList<IArticleSimple>> => {
  return axios.get(`/articles?page=${pagination.page}&pageSize=${pagination.pageSize}`);
}

export const getArticleById = (id: string): AxiosPromise<IArticle> => {
  return axios.get(`/articles/${id}`);
}

export const createArticle = (article: IArticleFormValues): AxiosPromise<IArticle> => {
  return axios.post(`/articles`, article);
}

export const updateArticle = (id: string, article: IArticleFormValues): AxiosPromise<IArticle> => {
  return axios.patch(`/articles/${id}`, article);
}

export const getTags = (pagination: IPaginationProps): AxiosPromise<IApiList<IArticleTag>> => {
  return axios.get(`/tags?page=${pagination.page}&pageSize=${pagination.pageSize}`);
}

export const getTag = (tagId: string): AxiosPromise<IArticleTag> => {
  return axios.get(`/tags/${tagId}`);
}

export const getTagsForSearch = (search: string): AxiosPromise<IArticleTag[]> => {
  return axios.get(`/tags/search?search=${search}`);
}

export const createTag = (tag: ICreateTagValues): AxiosPromise<IArticleTag> => {
  return axios.post(`/tags`, tag);
}

export const updateTag = (id: string, tag: ICreateTagValues): AxiosPromise<IArticleTag> => {
  return axios.patch(`/tags/${id}`, tag);
}