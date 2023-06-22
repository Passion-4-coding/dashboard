import {
  CreateQuestionDrawer,
  EditQuestionDrawer,
  QuestionsList,
} from "../../modules/quiz";

export const Quiz = () => {
  return (
    <div>
      <QuestionsList />
      <CreateQuestionDrawer />
      <EditQuestionDrawer />
    </div>
  );
};
