import { useState, useCallback } from "react";
import { Alert, Tabs, TabsProps } from "antd";
import { IArticleBaseFormValues, TArticleLanguage } from "../types";
import { CreateArticleForm } from "../CreateArticleForm";
import { CreateArticleBaseForm } from "../CreateArticleBaseForm";
import styles from "./CreateArticlesTabs.module.css";

export const CreateArticlesTabs = () => {
  const [baseValues, setBaseValues] = useState<IArticleBaseFormValues>();
  const [isBaseValuesValid, setIsBaseValuesValid] = useState(false);

  const handleBaseFormChange = (values: IArticleBaseFormValues) => {
    setBaseValues(values);
    setIsBaseValuesValid(!!(values.publishedOn && values.slug));
  };

  const items: TabsProps["items"] = [
    {
      key: "en",
      label: "English",
      children: baseValues && (
        <CreateArticleForm language="en" baseValues={baseValues} />
      ),
    },
    {
      key: "ua",
      label: "Ukrainian",
      children: baseValues && (
        <CreateArticleForm language="ua" baseValues={baseValues} />
      ),
    },
    {
      key: "ru",
      label: "Russian",
      children: baseValues && (
        <CreateArticleForm language="ru" baseValues={baseValues} />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <CreateArticleBaseForm onChange={handleBaseFormChange} />
      {isBaseValuesValid ? (
        <Tabs items={items} />
      ) : (
        <Alert
          message="Provide all base article data to add language sensitive content"
          type="warning"
        />
      )}
    </div>
  );
};
