import { useCallback, useEffect } from "react";
import { ITelegramMember } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Table } from "../../../components/Table";
import { ColumnType } from "antd/es/table";
import { ApiStatuses } from "../../../app/types";
import { Switch } from "antd";
import {
  actions,
  fetchTelegramMembers,
  updateTelegramMemberActive,
} from "../slice";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../app/constants";
import { IMember } from "../../members";

export const TelegramMembersList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    telegramMembers,
    statusTelegramMembers,
    telegramMembersPagination,
    telegramMembersTotal,
  } = useSelector((state: RootState) => {
    return state.karma;
  });

  const handleUpdateMemberActive = (active: boolean, memberId: string) => {
    dispatch(updateTelegramMemberActive({ memberId, active }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "memberId",
      key: "tgname",
      render: (member: IMember) => member.username,
    },
    {
      title: "Telegram name",
      dataIndex: "tgname",
      key: "tgname",
    },
    {
      title: "Discord Id",
      dataIndex: "discordId",
      key: "discordId",
    },
    {
      title: "Is active",
      key: "active",
      render: (member: ITelegramMember) => (
        <Switch
          checked={member.active}
          onChange={(active) => handleUpdateMemberActive(active, member._id)}
        />
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedOn",
      key: "updatedOn",
      render: (date: string) => format(new Date(date), DATE_FORMAT),
    },
  ] as ColumnType<ITelegramMember>[];

  const handleChangePagination = (page: number, pageSize: number) => {
    dispatch(actions.setTelegramMembersPagination({ page, pageSize }));
  };

  const getTelegramMembers = useCallback(() => {
    dispatch(fetchTelegramMembers(telegramMembersPagination));
  }, [dispatch, telegramMembersPagination]);

  useEffect(() => {
    getTelegramMembers();
  }, [getTelegramMembers]);

  return (
    <Table
      pagination={telegramMembersPagination}
      dataSource={telegramMembers}
      columns={columns}
      loading={statusTelegramMembers === ApiStatuses.loading}
      onPaginationChange={handleChangePagination}
      total={{ title: "Telegram members", amount: telegramMembersTotal }}
    />
  );
};
