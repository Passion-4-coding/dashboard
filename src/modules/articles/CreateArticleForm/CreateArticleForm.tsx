import { FC } from "react";
import { Button, Form, Input, notification } from "antd";
import {
  IArticleBaseFormValues,
  IArticleLanguageFormValues,
  TArticleLanguage,
} from "../types";
import { createArticle } from "../api";
import { RichTextEditor } from "../../../components/RichTextEditor";
import { useNavigate } from "react-router-dom";
import styles from "./CreateArticleForm.module.css";

const { TextArea } = Input;

interface Props {
  language: TArticleLanguage;
  baseValues: IArticleBaseFormValues;
}

export const CreateArticleForm: FC<Props> = ({ language, baseValues }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: IArticleLanguageFormValues) => {
    try {
      await createArticle({
        ...values,
        language,
      });
    } catch {
      notification.success({
        message: "Error while creating article",
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
          active: true,
          pending: true,
        }}
        onFinish={onFinish}
      >
        <main className={styles["form-content"]}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="Enter title" type="text" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <RichTextEditor />
          </Form.Item>
          <Form.Item
            label="Title compact"
            name="titleCompact"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="Enter title compact" />
          </Form.Item>
          <Form.Item
            label="Content compact"
            name="contentCompact"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter content compact" />
          </Form.Item>
          <Form.Item
            label="Seo tag title"
            name="titleSeo"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter content for the title seo tag" />
          </Form.Item>
          <Form.Item
            label="Seo tag description"
            name="descriptionSeo"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter content for the description seo tag" />
          </Form.Item>
          <Form.Item
            label="Seo keywords"
            name="keywordsSeo"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <TextArea placeholder="Enter content for the keywords" />
          </Form.Item>
        </main>
        <footer className={styles.buttons}>
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
