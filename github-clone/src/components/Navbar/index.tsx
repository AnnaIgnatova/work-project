import { useState } from "react";
import styles from "./style.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
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
    </div>
  );
};
