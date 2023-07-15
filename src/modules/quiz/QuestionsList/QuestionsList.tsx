import { IQuizQuestion } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Table } from "../../../components/Table";
import { ColumnType } from "antd/es/table";
import { ApiStatuses } from "../../../app/types";
import { Button } from "antd";
import { IconPlus } from "../../../assets";
import { useSearchParams } from "react-router-dom";
import { actions, fetchQuestions } from "../slice";
import { useCallback, useEffect } from "react";

export const QuestionsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, pagination, total } = useSelector(
    (state: RootState) => {
      return state.quiz;
    }
  );

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Complexity",
      dataIndex: "complexity",
      key: "complexity",
    },
    {
      title: "Correct choice",
      key: "correct",
      render: (question: IQuizQuestion) => {
        const correctKey = `answer${question.correct}` as keyof IQuizQuestion;
        return `${question.correct}: ${question[correctKey]}`;
      },
    },
    {
      title: "Is active",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Active" : "Disabled"),
    },
  ] as ColumnType<IQuizQuestion>[];

  const handleCreateNewQuestion = () => {
    searchParams.set("create", "true");
    setSearchParams(searchParams);
  };

  const handleChangePagination = (page: number, pageSize: number) => {
    dispatch(actions.setPagination({ page, pageSize }));
  };

  const getQuestions = useCallback(() => {
    dispatch(fetchQuestions(pagination));
  }, [dispatch, pagination]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const handleRowClick = (quiz: IQuizQuestion) => {
    dispatch(actions.setQuestion(quiz));
  };

  return (
    <Table
      action={
        <Button
          onClick={handleCreateNewQuestion}
          type="primary"
          icon={<IconPlus />}
        >
          Add question
        </Button>
      }
      pagination={pagination}
      dataSource={list}
      columns={columns}
      onRowClick={handleRowClick}
      loading={status === ApiStatuses.loading}
      onPaginationChange={handleChangePagination}
      total={{ title: "Questions", amount: total }}
    />
  );
};
