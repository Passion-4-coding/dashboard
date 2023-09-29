import { Spin } from "antd";
import styles from "./LoaderWrapper.module.css";

export const Loader = () => (
  <div className={styles.container}>
    <Spin />
  </div>
);
