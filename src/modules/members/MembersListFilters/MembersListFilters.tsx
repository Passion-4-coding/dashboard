import { Space } from "antd";
import styles from "./MembersListFilters.module.css";

export const MembersListFilters = () => {
  return (
    <Space
      direction="horizontal"
      size={12}
      className={styles.container}
    ></Space>
  );
};
