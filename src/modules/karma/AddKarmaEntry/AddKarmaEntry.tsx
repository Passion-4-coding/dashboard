import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputNumber, Select, notification } from "antd";
import { EKarmaType, ICreateKarmaEntryValues, IKarmaEntry } from "../types";
import { addEntry, updateEntry } from "../api";
import { SelectMember } from "../../members";

interface Props {
  entry?: IKarmaEntry;
}

export const AddKarmaEntry: FC<Props> = ({ entry }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: ICreateKarmaEntryValues) => {
    try {
      if (entry) {
        await updateEntry(entry._id, values);
        notification.success({
          message: "Karma entry successfully updated",
        });
        return;
      }
      await addEntry(values);
      notification.success({
        message: "Karma entry successfully created",
      });
      navigate(`/karma`);
    } catch {
      notification.error({
        message: entry
          ? "Error while updating karma entry"
          : "Error while creating karma entry",
      });
    }
  };

  return (
    <div>
      <Form
        layout={"vertical"}
        form={form}
        autoComplete="off"
        initialValues={{
          active: true,
          pending: true,
          ...entry,
        }}
        onFinish={onFinish}
      >
        <main>
          <Form.Item
            label="Karma"
            name="karma"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Karma points" />
          </Form.Item>
          <Form.Item
            label="Member"
            name="memberId"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <SelectMember />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select
              showSearch
              placeholder="Select type"
              optionFilterProp="children"
              options={(
                Object.keys(EKarmaType) as Array<keyof typeof EKarmaType>
              ).map((karmaType) => ({
                value: EKarmaType[karmaType],
                label: karmaType,
              }))}
            />
          </Form.Item>
        </main>
        <footer>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              {entry ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </footer>
      </Form>
    </div>
  );
};
