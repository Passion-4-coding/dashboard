import { FC, HTMLProps } from "react";
import styles from "./Label.module.css";

interface Props extends HTMLProps<HTMLDivElement> {
  children: JSX.Element | string;
}

export const Label: FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <div {...rest} className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
};
