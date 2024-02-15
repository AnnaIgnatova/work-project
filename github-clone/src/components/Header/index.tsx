import { useState } from "react";
import { Switch } from "antd";
import styles from "./style.module.scss";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  const onChange = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  };

  return (
    <header className={`${styles.header} ${theme}`}>
      <h1 className={styles["logo"]}>GitHub Users</h1>
      <Switch onChange={onChange} />
    </header>
  );
};
