import { FC, HTMLProps } from "react";
import styles from "./Button2.module.css";

interface Props extends HTMLProps<HTMLParagraphElement> {}

export const Button2: FC<Props> = ({ className = "", ...rest }) => {
  return <p className={`${styles.button2} ${className}`} {...rest} />;
};
