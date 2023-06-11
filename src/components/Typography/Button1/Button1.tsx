import { FC } from "react";
import styles from "./Button1.module.css";

interface Props {
  children: string | number;
  className?: string;
}

export const Button1: FC<Props> = ({ children, className = "" }) => {
  return <p className={`${styles.button1} ${className}`}>{children}</p>;
};
