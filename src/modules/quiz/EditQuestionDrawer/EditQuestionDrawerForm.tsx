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
import { IQuizQuestion, IQuizQuestionFormValues } from "../types";
import { actions, fetchQuestions } from "../slice";
import { AppDispatch, RootState } from "../../../app/store";
import { updateQuestion } from "../api";
import styles from "./EditQuestionDrawer.module.css";

const { Option } = Select;
const { TextArea } = Input;

interface Props {
  question: IQuizQuestion;
  onClose: () => void;
}

export const EditQuestionForm: FC<Props> = ({ question, onClose }) => {
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

  return (
    <div className={styles.form}>
      <Form
        layout={"vertical"}
        form={form}
        autoComplete="off"
        initialValues={{
          ...question,
          complexity: Number(question.complexity),
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
            <Button block type="default" onClick={onClose}>
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
