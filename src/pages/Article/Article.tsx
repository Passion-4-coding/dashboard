import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../modules/articles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { ArticleForm } from "../../modules/articles/ArticleForm";
import styles from "./Article.module.css";
import { LoaderWrapper } from "../../components/LoaderWrapper";

export const Article = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { article, articleStatus } = useSelector((state: RootState) => {
    return state.articles;
  });

  const getArticle = useCallback(() => {
    if (!params.id) return;
    dispatch(fetchArticle(params.id));
  }, [params, dispatch]);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return (
    <LoaderWrapper status={articleStatus}>
      {article ? (
        <div className={styles.container}>
          <ArticleForm article={article} />
        </div>
      ) : (
        <></>
      )}
    </LoaderWrapper>
  );
};
