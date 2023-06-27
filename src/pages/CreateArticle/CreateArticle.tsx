import { CreateArticlesTabs } from "../../modules/articles";
import styles from "./CreateArticle.module.css";

export const CreateArticle = () => {
  return (
    <div className={styles.container}>
      <CreateArticlesTabs />
    </div>
  );
};
