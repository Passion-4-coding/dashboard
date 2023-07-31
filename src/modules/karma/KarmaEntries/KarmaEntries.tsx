import { useCallback, useEffect } from "react";
import { IKarmaEntry } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Table } from "../../../components/Table";
import { ColumnType } from "antd/es/table";
import { ApiStatuses } from "../../../app/types";
import { actions, fetchKarmaEntries } from "../slice";
import { IMember } from "../../members";
import { KarmaEntriesFilters } from "../KarmaEntriesFilters";
import { format } from "date-fns";
import { DATE_TIME_NO_SECONDS_COMPACT_FORMAT } from "../../../app/constants";

export const KarmaEntries = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    entries,
    statusEntries,
    entriesPagination,
    entriesTotal,
    entriesFilters,
  } = useSelector((state: RootState) => {
    return state.karma;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "memberId",
      key: "tgname",
      render: (member: IMember) => member.username,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) =>
        format(new Date(date), DATE_TIME_NO_SECONDS_COMPACT_FORMAT),
    },
    {
      title: "Karma",
      dataIndex: "karma",
      key: "karma",
    },
  ] as ColumnType<IKarmaEntry>[];

  const handleChangePagination = (page: number, pageSize: number) => {
    dispatch(actions.setKarmaEntriesPagination({ page, pageSize }));
  };

  const getEntries = useCallback(() => {
    dispatch(
      fetchKarmaEntries({
        pagination: entriesPagination,
        filters: entriesFilters,
      })
    );
  }, [dispatch, entriesPagination, entriesFilters]);

  useEffect(() => {
    getEntries();
  }, [getEntries]);

  return (
    <>
      <KarmaEntriesFilters />
      <Table
        pagination={entriesPagination}
        dataSource={entries}
        columns={columns}
        loading={statusEntries === ApiStatuses.loading}
        onPaginationChange={handleChangePagination}
        total={{ title: "Karma entries", amount: entriesTotal }}
      />
    </>
  );
};
