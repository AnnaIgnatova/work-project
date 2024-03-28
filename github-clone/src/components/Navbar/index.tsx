import { useState } from "react";
import styles from "./style.module.scss";
import { useUnit } from "effector-react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import {
  $followersMinCount,
  $userName,
  changeFollowersMinCount,
  changeUserNameEvent,
} from "../../store/filters";
import { getUsersEvent } from "../../store/users";

export const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const toggleNavbar = () => setShowNavbar(!showNavbar);

  const [userName, followers, changeName, setFollowers] = useUnit([
    $userName,
    $followersMinCount,
    changeUserNameEvent,
    changeFollowersMinCount,
  ]);

  return (
    <div className={styles.navbar}>
      <button
        className={`${styles["navbar__header__button"]}`}
        onClick={toggleNavbar}
      >
        {showNavbar ? (
          <LeftOutlined style={{ fontSize: "24px" }} />
        ) : (
          <RightOutlined style={{ fontSize: "24px" }} />
        )}
      </button>
      <div className={`${!showNavbar ? "hidden" : ""}`}>
        <div className={styles["navbar__header"]}>
          <h3 className={styles["navbar__header__title"]}>Filters</h3>
        </div>
        <div className={styles["navbar__container"]}>
          <label>
            Name
            <Input placeholder="Name" value={userName} onChange={changeName} />
          </label>
          <label>
            Followers from
            <Input type="number" value={followers} onChange={setFollowers} />
          </label>

          <Button onClick={getUsersEvent}>Найти</Button>
        </div>
      </div>
    </div>
  );
};
