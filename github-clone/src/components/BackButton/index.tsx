import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Button onClick={goBack} className={styles.button}>
      Back
    </Button>
  );
};
