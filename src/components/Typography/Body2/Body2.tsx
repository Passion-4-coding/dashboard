import { FC, ReactNode } from "react";
import styles from "./Body2.module.css";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const Body2: FC<Props> = ({ children, className = "" }) => {
  return <p className={`${styles.body2} ${className}`}>{children}</p>;
};
