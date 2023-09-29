import { IArticleSimple, IArticleTag } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Table } from "../../../components/Table";
import { ColumnType } from "antd/es/table";
import { ApiStatuses } from "../../../app/types";
import { Button } from "antd";
import { IconPlus } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { actions, fetchATags } from "../slice";
import { useCallback, useEffect } from "react";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../app/constants";

export const ArticleTags = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { tags, tagsStatus, tagsPagination, tagsTotal } = useSelector(
    (state: RootState) => {
      return state.articles;
    }
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (date: string) => format(new Date(date), DATE_FORMAT),
    },
    {
      title: "Updated",
      dataIndex: "updatedOn",
      key: "updatedOn",
      render: (date: string) => format(new Date(date), DATE_FORMAT),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (active ? "Yes" : "No"),
    },
  ] as ColumnType<IArticleSimple>[];

  const getArticles = useCallback(() => {
    dispatch(fetchATags(tagsPagination));
  }, [dispatch, tagsPagination]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const handleRowClick = (tag: IArticleTag) => {
    navigate(`/tags/${tag._id}`);
  };

  const handleCreateNewTag = () => {
    navigate("/tags/create");
  };

  const handleChangePagination = (page: number, pageSize: number) => {
    dispatch(actions.setTagsPagination({ page, pageSize }));
  };

  return (
    <Table
      action={
        <Button onClick={handleCreateNewTag} type="primary" icon={<IconPlus />}>
          Create Tag
        </Button>
      }
      pagination={tagsPagination}
      dataSource={tags}
      columns={columns}
      onRowClick={handleRowClick}
      loading={tagsStatus === ApiStatuses.loading}
      onPaginationChange={handleChangePagination}
      total={{ title: "Articles", amount: tagsTotal }}
    />
  );
};
