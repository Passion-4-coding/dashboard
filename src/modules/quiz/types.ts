import { ApiStatuses, IPaginationProps, Nullable } from "../../app/types";

export interface IQuizQuestion {
  _id: string;
  date: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correct: string;
  active: boolean;
}

export type IQuizQuestionFormValues = Omit<IQuizQuestion, "_id">;

export interface IQuizSliceState {
  list: IQuizQuestion[];
  status: ApiStatuses;
  pagination: IPaginationProps;
  selectedQuestion: Nullable<IQuizQuestion>;
  total: number;
  isCreateDrawerOpen: boolean;
}