import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesBySlug } from "../slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";

export const EditArticleTabs = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchArticlesBySlug = useCallback(() => {
    if (!params.slug) return;
    dispatch(fetchArticlesBySlug(params.slug));
  }, [params, dispatch]);

  useEffect(() => {
    handleFetchArticlesBySlug();
  }, [handleFetchArticlesBySlug]);

  return <div>EditArticleTabs</div>;
};
