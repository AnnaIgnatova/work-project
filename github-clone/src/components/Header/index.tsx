import { useState } from "react";
import { Switch } from "antd";
import styles from "./style.module.scss";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const THEME_KEY = "theme";

export const Header: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(THEME_KEY) as Theme) || Theme.DARK
  );

  const onChange = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  return (
    <header className={`${styles.header} ${theme}`}>
      <h1 className={styles["logo"]}>GitHub Users</h1>
      <Switch onChange={onChange} />
    </header>
  );
};
