import { Avatar, Dropdown } from "antd";
import { MenuProps } from "rc-menu";
import { IconLogout } from "../../../assets";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import styles from "./UserInfo.module.css";

export const UserInfo = () => {
  const user = useSelector((state: RootState) => {
    return state.auth.user;
  });

  const handleLogout = () => {
    // TODO
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "logout",
      onClick: () => handleLogout(),
      itemIcon: <IconLogout className={styles.icon} />,
    },
  ];

  if (!user) return null;

  return (
    <Dropdown menu={{ items }}>
      <div className={styles.container}>
        {user.name}
        <Avatar src={<img src={user.avatar} alt={user.name} />} />
      </div>
    </Dropdown>
  );
};
