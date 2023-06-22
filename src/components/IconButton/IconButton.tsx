import { FC, HTMLProps } from "react";
import classNames from "classnames/bind";
import styles from "./IconButton.module.css";

const cx = classNames.bind(styles);

interface Props extends HTMLProps<HTMLButtonElement> {
  color?: "default" | "white";
}

export const IconButton: FC<Props> = ({ color = "default", ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className={cx({ button: true, [color]: true })}
    />
  );
};
