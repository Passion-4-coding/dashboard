import { FC } from "react";
import styles from "./Body1.module.css";

interface Props {
  children: string;
  className?: string;
}

export const Body1: FC<Props> = ({ children, className = "" }) => {
  return <p className={`${styles.body1} ${className}`}>{children}</p>;
};
