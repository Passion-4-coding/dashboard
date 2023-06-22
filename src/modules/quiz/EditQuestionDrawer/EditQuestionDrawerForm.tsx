import { FC } from "react";
import { Button, Form, Input, Select, Switch, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IQuizQuestion, IQuizQuestionFormValues } from "../types";
import { actions, fetchQuestions } from "../slice";
import { AppDispatch, RootState } from "../../../app/store";
import { updateQuestion } from "../api";
import styles from "./EditQuestionDrawer.module.css";

const { Option } = Select;
const { TextArea } = Input;

interface Props {
  question: IQuizQuestion;
}

export const EditQuestionForm: FC<Props> = ({ question }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const pagination = useSelector((state: RootState) => {
    return state.quiz.pagination;
  });

  const onFinish = async (values: IQuizQuestionFormValues) => {
    try {
      await updateQuestion(question._id, values);
      notification.success({
        message: "Question successfully updated",
      });
      dispatch(fetchQuestions(pagination));
      dispatch(actions.setQuestion(null));
    } catch {
      notification.success({
        message: "Error while updating question",
      });
    }
  };

  const onCloseHandler = () => {
    dispatch(actions.setQuestion(null));
  };

  return (
    <div className={styles.form}>
      <Form
        layout={"vertical"}
        form={form}
        autoComplete="off"
        initialValues={{
          ...question,
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
            label="Answer first option"
            name="answer1"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter first option" />
          </Form.Item>
          <Form.Item
            label="Answer second option"
            name="answer2"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter second option" />
          </Form.Item>
          <Form.Item label="Answer third option" name="answer3">
            <TextArea placeholder="Enter third option" />
          </Form.Item>
          <Form.Item label="Answer fourth option" name="answer4">
            <TextArea placeholder="Enter fourth option" />
          </Form.Item>
          <Form.Item label="Correct answer" name="correctAnswer">
            <TextArea placeholder="Correct answer" />
          </Form.Item>
          <Form.Item
            label="Karma early reward"
            name="karmaRewardEarly"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select placeholder="Select reward">
              {[15, 20, 25].map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Karma late reward"
            name="karmaRewardLate"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select placeholder="Select reward">
              {[5, 10, 15].map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
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
              Update
            </Button>
          </Form.Item>
        </footer>
      </Form>
    </div>
  );
};
