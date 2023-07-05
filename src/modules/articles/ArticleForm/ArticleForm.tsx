import { FC } from "react";
import { Button, Form, Input, notification } from "antd";
import {
  IArticle,
  IArticleBaseFormValues,
  IArticleLanguageFormValues,
  TArticleLanguage,
} from "../types";
import { createArticle, updateArticle } from "../api";
import { RichTextEditor } from "../../../components/RichTextEditor";
import styles from "./ArticleForm.module.css";
import { useNavigate } from "react-router-dom";
import { mapValues } from "../utils";

const { TextArea } = Input;

interface Props {
  language: TArticleLanguage;
  baseValues: IArticleBaseFormValues;
  articles?: IArticle[];
}

export const ArticleForm: FC<Props> = ({ language, baseValues, articles }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const article = articles
    ? articles.find((a) => a.language === language)
    : null;

  const onFinish = async (values: IArticleLanguageFormValues) => {
    console.log(values);
    try {
      const mappedValues = mapValues(baseValues, values, language);
      if (article) {
        await updateArticle(article._id, mappedValues);
        return;
      }
      const newArticle = await createArticle(mappedValues);

      navigate(`/articles/${newArticle.data.slug}`);
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
          ...article,
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
              {article ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </footer>
      </Form>
    </div>
  );
};
