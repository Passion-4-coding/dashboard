import { FC, ReactNode } from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "../Header";
import { Navigation } from "../../modules/navigation";
import { H2 } from "../../components/Typography";
import styles from "./Layout.module.css";

const { Header: AntHeader, Content, Sider } = AntLayout;

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <AntLayout>
      <Sider className={styles.sider} width={160}>
        <H2 className={styles["sider-header"]}>&#60; DASHBOARD &#62;</H2>
        <Navigation />
      </Sider>
      <AntLayout className="site-layout">
        <AntHeader className={styles.header}>
          <Header />
        </AntHeader>
        <Content className={styles.content}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};
