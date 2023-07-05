import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleContainer, fetchArticlesBySlug } from "../../modules/articles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import styles from "./Article.module.css";

export const Article = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const articlesBySlug = useSelector((state: RootState) => {
    return state.articles.articlesBySlug;
  });

  const getArticlesBySlug = useCallback(() => {
    if (!params.slug) return;
    dispatch(fetchArticlesBySlug(params.slug));
  }, [params, dispatch]);

  useEffect(() => {
    getArticlesBySlug();
  }, [getArticlesBySlug]);

  if (!articlesBySlug) return null;

  return (
    <div className={styles.container}>
      <ArticleContainer articles={articlesBySlug} />
    </div>
  );
};
