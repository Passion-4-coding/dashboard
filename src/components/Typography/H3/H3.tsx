import { FC } from "react";
import styles from "./H3.module.css";

interface Props {
  children: string;
  className?: string;
}

export const H3: FC<Props> = ({ children, className = "" }) => {
  return <h3 className={`${styles.h3} ${className}`}>{children}</h3>;
};
