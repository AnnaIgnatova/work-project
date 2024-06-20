import {useState} from "react";
import styles from "./style.module.scss";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {NavbarForm} from "./Form";

interface NavbarProps {
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({isLoading}) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const toggleNavbar = () => setShowNavbar(!showNavbar);

  return (
    <div className={styles.navbar}>
      <button className={`${styles["navbar__header__button"]}`} onClick={toggleNavbar}>
        {showNavbar ? <LeftOutlined style={{fontSize: "24px"}} /> : <RightOutlined style={{fontSize: "24px"}} />}
      </button>
      <div className={`${!showNavbar ? "hidden" : ""}`}>
        <div className={styles["navbar__header"]}>
          <h3 className={styles["navbar__header__title"]}>Filters</h3>
        </div>
        <NavbarForm isLoading={isLoading} />
      </div>
    </div>
  );
};
