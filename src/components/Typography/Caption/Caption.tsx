import { FC, ReactNode } from "react";
import styles from "./Caption.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Caption: FC<Props> = ({ children, className = "" }) => {
  return <p className={`${styles.caption} ${className}`}>{children}</p>;
};
