import { Tabs, TabsProps } from "antd";
import { useAbility } from "@casl/react";
import { AbilityContext } from "../../modules/casl";
import {
  TelegramMembersList,
  KarmaEntries,
  AddKarmaEntry,
} from "../../modules/karma";
import { MembersList } from "../../modules/members";
import styles from "./Karma.module.css";

export const Karma = () => {
  const ability = useAbility(AbilityContext);
  const items: TabsProps["items"] = [
    {
      key: "karma-entries",
      label: "Entries",
      children: <KarmaEntries />,
    },
  ];

  if (ability.can("read", "karma-telegram")) {
    items.push({
      key: "telegram",
      label: "Telegram members",
      children: <TelegramMembersList />,
    });
  }

  if (ability.can("read", "members-total-karma")) {
    items.push({
      key: "members-total-karma",
      label: "Members total karma",
      children: <MembersList />,
    });
  }

  if (ability.can("add", "karma-entry")) {
    items.push({
      key: "add-karma-entry",
      label: "Add karma entry",
      children: <AddKarmaEntry />,
    });
  }

  return <Tabs items={items} className={styles.tabs} />;
};
