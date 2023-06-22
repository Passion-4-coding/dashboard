import { FC, useEffect } from "react";
import { Drawer } from "antd";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { actions } from "../slice";
import { CreateQuestionForm } from "./CreateQuestionForm";
import styles from "./CreateQuestionDrawer.module.css";

export const CreateQuestionDrawer: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const open = useSelector((state: RootState) => {
    return state.quiz.isCreateDrawerOpen;
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
    dispatch(actions.setIsCreateDrawerOpen(false));
  };

  return (
    <Drawer
      title="Create question"
      open={open}
      width={500}
      afterOpenChange={handleResetSearchParams}
      closable={false}
      className={styles.drawer}
      onClose={onCloseHandler}
    >
      <CreateQuestionForm />
    </Drawer>
  );
};
