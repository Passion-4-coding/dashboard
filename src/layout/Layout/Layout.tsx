import { FC, ReactNode } from "react";
import { Layout as AntLayout } from "antd";
import { Header } from "../Header";
import { Navigation } from "../../modules/navigation";
import styles from "./Layout.module.css";

const { Header: AntHeader, Content, Sider } = AntLayout;

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <AntLayout>
      <Sider className={styles.sider} width={160}>
        <img src="/images/logo.png" alt="passion for coding" />
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
