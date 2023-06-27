import { H2 } from "../../components/Typography";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { titles } from "./utils";
import styles from "./HeaderTitle.module.css";

const getTitleFromPath = (path: string) => {
  const paths = path.split("/");
  const titleKey = paths[paths.length - 1];
  const titleRoot = paths[paths.length - 2];
  if (titleRoot === "articles" && titleKey === "create")
    return "Create article";
  if (!titleKey) return "Home";
  return titles[titleKey];
};

export const HeaderTitle = () => {
  const location = useLocation();
  const [title, setTitle] = useState(getTitleFromPath(location.pathname));

  useEffect(() => {
    const updatedTitle = getTitleFromPath(location.pathname);
    setTitle(updatedTitle);
  }, [location]);

  return (
    <div className={styles.container}>
      <H2>{title}</H2>
    </div>
  );
};
