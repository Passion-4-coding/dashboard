import { FC, useEffect } from "react";
import { Form, Input, Switch } from "antd";
import { IArticleBaseFormValues } from "../types";
import styles from "./ArticleBaseForm.module.css";
import { DatePicker } from "../../../components/DatePicker";

interface Props {
  onChange: (values: IArticleBaseFormValues) => void;
  baseValues?: IArticleBaseFormValues;
}

export const ArticleBaseForm: FC<Props> = ({ onChange, baseValues }) => {
  const [form] = Form.useForm();

  const handleChange = () => {
    onChange(form.getFieldsValue());
  };

  const initialValues = baseValues
    ? { ...baseValues, publishedOn: new Date(baseValues.publishedOn) }
    : { active: true, pending: true };

  return (
    <div className={styles.container}>
      <Form
        layout="inline"
        form={form}
        autoComplete="off"
        onFieldsChange={handleChange}
        initialValues={initialValues}
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
