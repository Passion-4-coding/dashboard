import { useCallback, useEffect } from "react";
import { IMember } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Table } from "../../../components/Table";
import { ColumnType } from "antd/es/table";
import { ApiStatuses } from "../../../app/types";
import { actions, fetchMembers } from "../slice";
import { MembersListFilters } from "../MembersListFilters";

export const MembersList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list, status, pagination, total, filters } = useSelector(
    (state: RootState) => {
      return state.members;
    }
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Total karma",
      dataIndex: "karma",
      key: "karma",
    },
  ] as ColumnType<IMember>[];

  const handleChangePagination = (page: number, pageSize: number) => {
    dispatch(actions.setPagination({ page, pageSize }));
  };

  const getMembers = useCallback(() => {
    dispatch(
      fetchMembers({
        pagination,
        filters,
      })
    );
  }, [dispatch, pagination, filters]);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

  return (
    <>
      <MembersListFilters />
      <Table
        pagination={pagination}
        dataSource={list}
        columns={columns}
        loading={status === ApiStatuses.loading}
        onPaginationChange={handleChangePagination}
        total={{ title: "Members", amount: total }}
      />
    </>
  );
};
