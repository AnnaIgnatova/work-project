import { useState } from "react";
import styles from "./style.module.scss";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import { Select } from "antd";

export const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const toggleNavbar = () => setShowNavbar(!showNavbar);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className={`${styles.navbar} ${!showNavbar ? "hidden" : ""}`}>
      <div className={styles["navbar__header"]}>
        <h3 className={styles["navbar__header__title"]}>Filters</h3>
        <button
          className={styles["navbar__header__button"]}
          onClick={toggleNavbar}
        >
          {showNavbar ? (
            <LeftSquareOutlined style={{ fontSize: "34px" }} />
          ) : (
            <RightSquareOutlined style={{ fontSize: "34px" }} />
          )}
        </button>
      </div>
      <div className={styles["navbar__container"]}>
        <Select
          defaultValue="value2"
          style={{ width: 120 }}
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
          style={{ width: 120 }}
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
          style={{ width: 120 }}
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
