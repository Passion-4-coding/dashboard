import { TagForm } from "../../modules/articles/TagForm";
import styles from "./CreateTag.module.css";

export const CreateTag = () => {
  return (
    <div className={styles.container}>
      <TagForm />
    </div>
  );
};
