import { Tabs, TabsProps } from "antd";
import { ArticleTags, ArticlesList } from "../../modules/articles";
import { AbilityContext } from "../../modules/casl";
import { useAbility } from "@casl/react";

export const Articles = () => {
  const ability = useAbility(AbilityContext);
  const items: TabsProps["items"] = [
    {
      key: "articles",
      label: "Articles",
      children: <ArticlesList />,
    },
  ];

  if (ability.can("read", "tags")) {
    items.push({
      key: "tags",
      label: "Tags",
      children: <ArticleTags />,
    });
  }

  return <Tabs items={items} />;
};
