import { FC, useCallback, useContext, useEffect, useState } from "react";
import { MenuProps } from "rc-menu";
import { Menu } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { NAVIGATION_ITEMS, findItemKeyByRoute } from "../utils";
import { INavigationItem, INavigationItemSimple } from "../types";
import { AbilityContext } from "../../casl";
import styles from "./Navigation.module.css";

export const Navigation: FC = () => {
  const location = useLocation();
  const ability = useContext(AbilityContext);
  const [key, setKey] = useState("");
  const [openKey, setOpenKey] = useState("");

  const filterItems = (item: INavigationItem | INavigationItemSimple) => {
    console.log(item.name, ability.can("read", item.name.toLowerCase()));
    return ability.can("read", item.name.toLowerCase());
  };

  const items: MenuProps["items"] = NAVIGATION_ITEMS.filter(filterItems).map(
    (item) => {
      return {
        label: (
          <Link
            style={{ pointerEvents: item.route ? "all" : "none" }}
            to={item.route}
          >
            {item.name}
          </Link>
        ),
        key: item.name,
        icon: item.icon,
      };
    }
  );

  useEffect(() => {
    const activeItem = findItemKeyByRoute(location.pathname);
    if (!activeItem) return;
    setKey(activeItem.name);
  }, [location.pathname]);

  const handleOpenKeyChange = (keys: string[]) => {
    const keysReversed = [...keys].reverse();
    const key = keysReversed.find((k) => {
      return NAVIGATION_ITEMS.find((i) => i.name === k);
    });
    setOpenKey(key || "");
  };

  return (
    <Menu
      prefix="test"
      theme="light"
      items={items}
      openKeys={[openKey]}
      mode="inline"
      className={styles.menu}
      onOpenChange={handleOpenKeyChange}
      selectedKeys={[key]}
    />
  );
};
