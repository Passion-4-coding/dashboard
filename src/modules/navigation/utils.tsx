import {
  IconNavArticles,
  IconNavHome,
  IconNavQuiz,
  IconNavKarma,
} from "../../assets";
import { INavigationItem, INavigationItemSimple } from "./types";

export const NAVIGATION_ITEMS: INavigationItem[] = [
  {
    route: "/",
    name: "Home",
    icon: <IconNavHome />,
  },
  {
    route: "/karma",
    name: "Karma",
    icon: <IconNavKarma />,
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
