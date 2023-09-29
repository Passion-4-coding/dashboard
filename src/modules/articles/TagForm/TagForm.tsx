import { FC } from "react";
import { Button, Form, Input, Switch, notification } from "antd";
import { IArticleTag, ICreateTagValues } from "../types";
import { createTag, updateTag } from "../api";
import styles from "./TagForm.module.css";

interface Props {
  tag?: IArticleTag;
}

export const TagForm: FC<Props> = ({ tag }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: ICreateTagValues) => {
    try {
      if (tag) {
        await updateTag(tag._id, values);
        notification.success({
          message: "Tag was successfully updated",
        });
        return;
      }
      await createTag(values);
      notification.success({
        message: "Tag was successfully created",
      });
    } catch {
      notification.error({
        message: "Error while creating tag",
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
          ...tag,
        }}
        onFinish={onFinish}
      >
        <main className={styles["form-content"]}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="Enter name" type="text" />
          </Form.Item>
          <Form.Item label="Is active" name="active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </main>
        <footer className={styles.buttons}>
          <Form.Item className={styles["button-container"]}>
            <Button block type="primary" htmlType="submit">
              {tag ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </footer>
      </Form>
    </div>
  );
};
