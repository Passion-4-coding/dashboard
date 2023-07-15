import { FC, useEffect } from "react";
import { Drawer } from "antd";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { actions } from "../slice";
import { EditQuestionForm } from "./EditQuestionDrawerForm";
import styles from "./EditQuestionDrawer.module.css";

export const EditQuestionDrawer: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const question = useSelector((state: RootState) => {
    return state.quiz.selectedQuestion;
  });

  useEffect(() => {
    if (searchParams.get("create")) {
      dispatch(actions.setIsCreateDrawerOpen(true));
    }
  }, [searchParams, dispatch]);

  const handleResetSearchParams = (visible: boolean) => {
    if (!visible) setSearchParams({});
  };

  const onCloseHandler = () => {
    dispatch(actions.setQuestion(null));
  };

  return (
    <Drawer
      title="Edit question"
      open={!!question}
      width="50%"
      afterOpenChange={handleResetSearchParams}
      className={styles.drawer}
      onClose={onCloseHandler}
    >
      {question && (
        <EditQuestionForm question={question} onClose={onCloseHandler} />
      )}
    </Drawer>
  );
};
