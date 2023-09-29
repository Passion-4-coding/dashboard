import { FC } from "react";
import { Button, Form, Input, Switch, notification } from "antd";
import { IArticle, IArticleFormValues } from "../types";
import { createArticle, updateArticle } from "../api";
import { RichTextEditor } from "../../../components/RichTextEditor";
import { useNavigate } from "react-router-dom";
import { SelectMember } from "../../members";
import { SelectTag } from "../SelectTag";
import styles from "./ArticleForm.module.css";
import { DatePicker } from "../../../components/DatePicker";

const { TextArea } = Input;

interface Props {
  article?: IArticle;
}

export const ArticleForm: FC<Props> = ({ article }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: IArticleFormValues) => {
    try {
      const mappedValues = { ...values, language: "ua" } as IArticleFormValues;
      if (article) {
        await updateArticle(article._id, mappedValues);
        notification.success({
          message: "Article was successfully updated",
        });
        return;
      }
      const newArticle = await createArticle(mappedValues);
      notification.success({
        message: "Article was successfully created",
      });
      navigate(`/articles/${newArticle.data.slug}`);
    } catch {
      notification.error({
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
          ...article,
          author: article && article.author ? article.author._id : undefined,
          publishedOn: article ? new Date(article.publishedOn) : undefined,
        }}
        onFinish={onFinish}
      >
        <main className={styles["form-content"]}>
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
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <SelectMember
              valueOption={
                article && article.author
                  ? {
                      label: article.author.username,
                      value: article.author._id,
                    }
                  : undefined
              }
            />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <SelectTag />
          </Form.Item>
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
