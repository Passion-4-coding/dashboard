import { ApiStatuses, IPaginationProps, Nullable } from "../../app/types";

export interface IQuizQuestion {
  _id: string;
  date: string;
  karmaRewardEarly: 25 | 30 | 35;
  karmaRewardLate: 15 | 20 | 25;
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
  karmaRewardEarly: 25 | 30 | 35;
  karmaRewardLate: 15 | 20 | 25;
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
  selectedQuestion: Nullable<IQuizQuestion>;
  total: number;
  isCreateDrawerOpen: boolean;
}