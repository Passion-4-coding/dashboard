import { Routes as Switch, Route } from "react-router-dom";
import { FC, useContext } from "react";
import { Home } from "../../pages/Home";
import { Quiz } from "../../pages/Quiz";
import { Articles } from "../../pages/Articles";
import { AbilityContext } from "../../modules/casl";
import { NoAccess } from "../../pages/NoAccess";
import { Layout } from "../Layout";
import { CreateArticle } from "../../pages/CreateArticle";
import { Article } from "../../pages/Article";
import { Karma } from "../../pages/Karma";

export const Routes: FC = () => {
  const ability = useContext(AbilityContext);
  return (
    <Layout>
      <Switch>
        <Route path="*" element={<NoAccess />} />
        {ability.can("read", "home") ? (
          <Route path={`/`} element={<Home />} />
        ) : (
          <></>
        )}
        <Route path={`/quiz`} element={<Quiz />} />
        {ability.can("read", "quiz") ? (
          <Route path={`/quiz`} element={<Quiz />} />
        ) : (
          <></>
        )}
        {ability.can("read", "articles") ? (
          <Route path={`/articles`} element={<Articles />} />
        ) : (
          <></>
        )}
        {ability.can("read", "karma") ? (
          <Route path={`/karma`} element={<Karma />} />
        ) : (
          <></>
        )}
        {ability.can("write", "articles") ? (
          <>
            <Route path={`/articles/create`} element={<CreateArticle />} />
            <Route path={`/articles/:slug`} element={<Article />} />
          </>
        ) : (
          <></>
        )}
      </Switch>
    </Layout>
  );
};
