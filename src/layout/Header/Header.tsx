import { UserInfo } from "../../modules/auth";
import { HeaderTitle } from "../HeaderTitle";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.container}>
      <HeaderTitle />
      <UserInfo />
    </div>
  );
};
