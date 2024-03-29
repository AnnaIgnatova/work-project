import { useState } from "react";
import styles from "./style.module.scss";
import { LeftOutlined, RightSquareOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

interface NavbarProps {
  setFollowersCount: (value: number) => void;
  setSearchName: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setFollowersCount,
  setSearchName,
}) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [followers, setFollowers] = useState<number>(0);
  const toggleNavbar = () => setShowNavbar(!showNavbar);

  const onSubmit = () => {
    setSearchName(name);
    setFollowersCount(followers);
  };

  return (
    <div className={`${styles.navbar} ${!showNavbar ? "hidden" : ""}`}>
      {!showNavbar && (
        <button
          className={`${styles["navbar__header__button"]} ${styles["navbar__header__button_show"]}`}
          onClick={toggleNavbar}
        >
          <RightSquareOutlined style={{ fontSize: "32px" }} />
        </button>
      )}
      <div className={styles["navbar__header"]}>
        <h3 className={styles["navbar__header__title"]}>Filters</h3>
        {showNavbar && (
          <button
            className={styles["navbar__header__button"]}
            onClick={toggleNavbar}
          >
            <LeftOutlined style={{ fontSize: "24px" }} />
          </button>
        )}
      </div>
      <div className={styles["navbar__container"]}>
        <label>
          Name
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Followers from
          <Input
            type="number"
            value={followers}
            onChange={(e) => setFollowers(+e.target.value)}
          />
        </label>

        <Button onClick={onSubmit}>Найти</Button>
      </div>
    </div>
  );
};
