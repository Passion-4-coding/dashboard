import { useParams, useSearchParams } from "react-router-dom";
import { TagForm } from "../../modules/articles/TagForm";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchATag } from "../../modules/articles/slice";
import { Spin } from "antd";
import { ApiStatuses } from "../../app/types";
import styles from "./EditTag.module.css";

export const EditTag = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { tag, tagStatus } = useSelector((state: RootState) => {
    return state.articles;
  });

  const getTag = useCallback(() => {
    dispatch(fetchATag(params.tagId as string));
  }, [params, dispatch]);

  useEffect(() => {
    getTag();
  }, [getTag]);

  if (tagStatus === ApiStatuses.loading) {
    return <Spin />;
  }

  return (
    <div className={styles.container}>
      <TagForm tag={tag} />
    </div>
  );
};
