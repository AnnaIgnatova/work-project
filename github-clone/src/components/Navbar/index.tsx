import { useState } from "react";
import styles from "./style.module.scss";
import { useUnit } from "effector-react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import {
  $createdBy,
  $followersMinCount,
  $userName,
  changeDateCreatedBy,
  changeFollowersMinCount,
  changeUserNameEvent,
} from "../../store/filters";
import { getUsersEvent } from "../../store/users";

interface NavbarProps {
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoading }) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const toggleNavbar = () => setShowNavbar(!showNavbar);

  const [userName, followers, createdBy, changeName, setFollowers, changeDate] =
    useUnit([
      $userName,
      $followersMinCount,
      $createdBy,
      changeUserNameEvent,
      changeFollowersMinCount,
      changeDateCreatedBy,
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
        <Form.Item label="Name">
          <Input
            disabled={isLoading}
            placeholder="Name"
            aria-label="name-input"
            value={userName}
            onChange={changeName}
          />
        </Form.Item>
        <Form.Item label="Followers count from">
          <Input
            disabled={isLoading}
            type="number"
            aria-label="followers-input"
            placeholder="Followers count from"
            value={followers}
            onChange={setFollowers}
          />
        </Form.Item>
        <Form.Item label="Created by">
          <Input
            disabled={isLoading}
            placeholder="Created by"
            aria-label="date-input"
            type="date"
            value={createdBy}
            onChange={changeDate}
          />
        </Form.Item>

        <Button onClick={getUsersEvent} disabled={isLoading}>
          Найти
        </Button>
      </div>
    </div>
  );
};
