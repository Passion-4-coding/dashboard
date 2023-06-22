import { ApiStatuses, IPaginationProps, Nullable } from "../../app/types";

export interface IQuizQuestion {
  id: string;
  date: string;
  karmaRewardEarly: 15 | 20 | 25,
  karmaRewardLate: 5 | 10 | 15,
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
  active: boolean;
}

export interface IQuizQuestionFormValues {
  date: string;
  karmaRewardEarly: 15 | 20 | 25,
  karmaRewardLate: 5 | 10 | 15,
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
  active: boolean;
}

export interface IQuizSliceState {
  list: IQuizQuestion[];
  status: ApiStatuses;
  pagination: IPaginationProps;
  total: number;
  isCreateDrawerOpen: boolean;
  selectedQuestionId: Nullable<string>;
}