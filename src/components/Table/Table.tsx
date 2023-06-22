import { FC, ReactNode } from "react";
import { Table as AntTable } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { TableHeader } from "./TableHeader";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { IPaginationProps, SortTypes } from "../../app/types";
import styles from "./Table.module.css";

export interface ITableTotal {
  amount: number;
  title: string;
}

interface Props<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  total?: ITableTotal;
  onPaginationChange?: (page: number, size: number) => void;
  onRowClick?: (itemId: T) => void;
  onSortChange?: (column: string, order: SortTypes) => void;
  action?: ReactNode;
  pagination: IPaginationProps;
  loading?: boolean;
}

export const Table: FC<Props<any>> = ({
  columns,
  dataSource,
  total,
  onPaginationChange,
  onSortChange,
  onRowClick,
  action,
  loading = false,
  pagination: _pagination,
}) => {
  const onRow = (row: unknown) => ({
    onClick: () => (onRowClick ? onRowClick(row) : undefined),
    style: {
      cursor: "pointer",
    },
  });

  const handleChange = (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<unknown> | SorterResult<unknown>[]
  ) => {
    const sortParams = sorter as SorterResult<unknown>;
    if (sorter && onSortChange) {
      onSortChange(
        sortParams.columnKey as string,
        sortParams.order as SortTypes
      );
    }
    if (onPaginationChange && pagination.current && pagination.pageSize) {
      onPaginationChange(pagination.current, pagination.pageSize);
    }
  };

  return (
    <div className={styles.container}>
      {(total || action) && <TableHeader total={total} action={action} />}
      <AntTable
        className={styles.table}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: total?.amount,
          current: _pagination.page,
          pageSize: _pagination.pageSize,
        }}
        rowKey="id"
        onRow={onRowClick ? onRow : undefined}
        onChange={handleChange}
        loading={loading}
      />
    </div>
  );
};
