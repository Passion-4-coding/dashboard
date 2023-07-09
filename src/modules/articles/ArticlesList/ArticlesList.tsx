import { IArticleSimple } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Table } from "../../../components/Table";
import { ColumnType } from "antd/es/table";
import { ApiStatuses } from "../../../app/types";
import { Button } from "antd";
import { IconPlus } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { actions, fetchArticles } from "../slice";
import { useCallback, useEffect } from "react";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../app/constants";

export const ArticlesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, pagination, total } = useSelector(
    (state: RootState) => {
      return state.articles;
    }
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "titleCompact",
      key: "titleCompact",
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
      title: "Pending",
      dataIndex: "pending",
      key: "pending",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
  ] as ColumnType<IArticleSimple>[];

  const handleChangePagination = (page: number, pageSize: number) => {
    dispatch(actions.setPagination({ page, pageSize }));
  };

  const getArticles = useCallback(() => {
    dispatch(fetchArticles(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const handleRowClick = (quiz: IArticleSimple) => {
    navigate(`/articles/${quiz.slug}`);
  };

  const handleCreateNewArticles = () => {
    navigate("/articles/create");
  };

  return (
    <Table
      action={
        <Button
          onClick={handleCreateNewArticles}
          type="primary"
          icon={<IconPlus />}
        >
          Create Article
        </Button>
      }
      pagination={pagination}
      dataSource={list}
      columns={columns}
      onRowClick={handleRowClick}
      loading={status === ApiStatuses.loading}
      onPaginationChange={handleChangePagination}
      total={{ title: "Articles", amount: total }}
    />
  );
};
