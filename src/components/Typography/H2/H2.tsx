import { FC, ReactNode } from "react";
import styles from "./H2.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

export const H2: FC<Props> = ({ children, className = "" }) => {
  return <h2 className={`${styles.h2} ${className}`}>{children}</h2>;
};
