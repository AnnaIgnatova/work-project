import loaderPath from "./../../assets/loader.webp";
import styles from './style.module.scss'

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src={loaderPath} alt="loader" />
    </div>
  );
};
