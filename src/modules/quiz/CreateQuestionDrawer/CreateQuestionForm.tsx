import { FC } from "react";
import {
  Button,
  Form,
  Input,
  Segmented,
  Select,
  Switch,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IQuizQuestionFormValues } from "../types";
import { actions, fetchQuestions } from "../slice";
import { AppDispatch, RootState } from "../../../app/store";
import { createQuestion } from "../api";
import styles from "./CreateQuestionDrawer.module.css";

const { Option } = Select;
const { TextArea } = Input;

export const CreateQuestionForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const pagination = useSelector((state: RootState) => {
    return state.quiz.pagination;
  });

  const onFinish = async (values: IQuizQuestionFormValues) => {
    try {
      await createQuestion(values);
      notification.success({
        message: "Question successfully created",
      });
      dispatch(fetchQuestions(pagination));
      form.resetFields();
      dispatch(actions.setIsCreateDrawerOpen(false));
    } catch {
      notification.success({
        message: "Error while creating question",
      });
    }
  };

  const onCloseHandler = () => {
    dispatch(actions.setIsCreateDrawerOpen(false));
  };

  return (
    <div className={styles.form}>
      <Form
        layout={"vertical"}
        form={form}
        autoComplete="off"
        initialValues={{
          active: true,
          complexity: 1,
        }}
        onFinish={onFinish}
      >
        <main className={styles["form-content"]}>
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            label="Answer A"
            name="answerA"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter option A" />
          </Form.Item>
          <Form.Item
            label="Answer B"
            name="answerB"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter option B" />
          </Form.Item>
          <Form.Item label="Answer C" name="answerC">
            <TextArea placeholder="Enter option C" />
          </Form.Item>
          <Form.Item label="Answer D" name="answerD">
            <TextArea placeholder="Enter option D" />
          </Form.Item>
          <Form.Item label="Correct answer" name="correct">
            <Select placeholder="Select correct option">
              {["A", "B", "C", "D"].map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Question complexity"
            name="complexity"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Segmented options={[1, 2, 3, 4, 5]} />
          </Form.Item>
          <Form.Item
            label="Is question active"
            name="active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </main>
        <footer className={styles.buttons}>
          <Form.Item className={styles["button-container"]}>
            <Button block type="default" onClick={onCloseHandler}>
              Cancel
            </Button>
          </Form.Item>

          <Form.Item className={styles["button-container"]}>
            <Button block type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </footer>
      </Form>
    </div>
  );
};
