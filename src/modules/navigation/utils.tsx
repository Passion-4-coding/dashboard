import { IconNavArticles, IconNavHome, IconNavQuiz } from "../../assets";
import { INavigationItem, INavigationItemSimple } from "./types";

export const NAVIGATION_ITEMS: INavigationItem[] = [
  {
    route: "/",
    name: "Home",
    icon: <IconNavHome />,
  },
  {
    route: "/quiz",
    name: "Quiz",
    icon: <IconNavQuiz />,
  },
  {
    route: "/articles",
    name: "Articles",
    icon: <IconNavArticles />,
  },
];

export const findItemKeyByRoute = (route: string) => {
  let item: INavigationItemSimple | undefined;
  NAVIGATION_ITEMS.forEach((navigationItem) => {
    if (navigationItem.route === route) {
      item = navigationItem;
      return;
    }
  });
  return item;
};
