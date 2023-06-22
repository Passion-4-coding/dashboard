import { FC, ReactNode } from "react";
import { Button1, H3 } from "../Typography";
import styles from "./Table.module.css";

export interface ITableTotal {
  amount: number;
  title: string;
}

interface Props {
  total?: ITableTotal;
  action?: ReactNode;
}

export const TableHeader: FC<Props> = ({ total, action }) => {
  return (
    <div className={styles.header}>
      {total && (
        <div className={styles.total}>
          <H3>{total.title}</H3>
          <span className={styles["total-label"]}>
            <Button1>{total.amount}</Button1>
          </span>
        </div>
      )}
      {action && <div className={styles["action-container"]}>{action}</div>}
    </div>
  );
};
