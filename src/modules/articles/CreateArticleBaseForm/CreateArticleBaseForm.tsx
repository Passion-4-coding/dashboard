import { FC, useEffect } from "react";
import { DatePicker, Form, Input, Switch } from "antd";
import { IArticleBaseFormValues } from "../types";
import styles from "./CreateArticleBaseForm.module.css";

interface Props {
  onChange: (values: IArticleBaseFormValues) => void;
}

export const CreateArticleBaseForm: FC<Props> = ({ onChange }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(1);
  }, []);

  const handleChange = () => {
    onChange(form.getFieldsValue());
  };

  return (
    <div className={styles.container}>
      <Form
        layout="inline"
        form={form}
        autoComplete="off"
        onFieldsChange={handleChange}
        initialValues={{
          active: true,
          pending: true,
        }}
      >
        <Form.Item label="Slug" name="slug">
          <Input placeholder="Enter slug" />
        </Form.Item>
        <Form.Item label="Date" name="publishedOn">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Is active" name="active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Is pending" name="pending" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
};
