import { useState } from "react";
import styles from "./style.module.scss";
import { LeftOutlined, RightSquareOutlined } from "@ant-design/icons";
import { Select } from "antd";

export const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const toggleNavbar = () => setShowNavbar(!showNavbar);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
        <Select
          defaultValue="value2"
          onChange={handleChange}
          options={[
            { value: "value1", label: "value1" },
            { value: "value2", label: "value2" },
            { value: "value3", label: "value3" },
            { value: "value4", label: "value4", disabled: true },
          ]}
        />
        <Select
          defaultValue="value1"
          onChange={handleChange}
          options={[
            { value: "value1", label: "value1" },
            { value: "value2", label: "value2" },
            { value: "value3", label: "value3" },
            { value: "value4", label: "value4", disabled: true },
          ]}
        />
        <Select
          defaultValue="value3"
          onChange={handleChange}
          options={[
            { value: "value1", label: "value1" },
            { value: "value2", label: "value2" },
            { value: "value3", label: "value3" },
            { value: "value4", label: "value4", disabled: true },
          ]}
        />
      </div>
    </div>
  );
};
