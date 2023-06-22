import { CreateQuestionDrawer, QuestionsList } from "../../modules/quiz";

export const Quiz = () => {
  return (
    <div>
      <QuestionsList />
      <CreateQuestionDrawer />
    </div>
  );
};
