import { FC, useState } from "react";
import { Alert, Tabs, TabsProps } from "antd";
import { IArticle, IArticleBaseFormValues } from "../types";
import { ArticleForm } from "../ArticleForm";
import { ArticleBaseForm } from "../ArticleBaseForm";
import styles from "./ArticleContainer.module.css";

interface Props {
  articles?: IArticle[];
}

export const ArticleContainer: FC<Props> = ({ articles }) => {
  const [baseValues, setBaseValues] = useState<
    IArticleBaseFormValues | undefined
  >(articles ? articles[0] : undefined);
  const [isBaseValuesValid, setIsBaseValuesValid] = useState(!!baseValues);

  const handleBaseFormChange = (values: IArticleBaseFormValues) => {
    setBaseValues(values);
    setIsBaseValuesValid(!!(values.publishedOn && values.slug));
  };

  const items: TabsProps["items"] = [
    {
      key: "en",
      label: "English",
      children: baseValues && (
        <ArticleForm
          language="en"
          baseValues={baseValues}
          articles={articles}
        />
      ),
    },
    {
      key: "ua",
      label: "Ukrainian",
      children: baseValues && (
        <ArticleForm
          language="ua"
          baseValues={baseValues}
          articles={articles}
        />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <ArticleBaseForm
        baseValues={baseValues}
        onChange={handleBaseFormChange}
      />
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
