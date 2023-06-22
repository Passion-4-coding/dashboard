import { AxiosPromise } from "axios";
import { IQuizQuestion, IQuizQuestionFormValues } from "./types";
import { axios } from "../axios";
import { IApiList, IPaginationProps } from "../../app/types";

export const getQuestions = (pagination: IPaginationProps): AxiosPromise<IApiList<IQuizQuestion>> => {
  return axios.get(`/quiz/questions?page=${pagination.page}&pageSize=${pagination.pageSize}`);
}

export const createQuestion = (question: IQuizQuestionFormValues): AxiosPromise<IQuizQuestion[]> => {
  return axios.post(`/quiz/questions`, question);
}

export const updateQuestion = (id: string, question: IQuizQuestionFormValues): AxiosPromise<IQuizQuestion[]> => {
  return axios.patch(`/quiz/questions/${id}`, question);
}