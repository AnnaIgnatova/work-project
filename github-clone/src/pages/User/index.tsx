import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Descriptions} from "antd";
import {Loader} from "../../components/Loader";
import {UserData} from "../../store/users/types";
import {BackButton} from "../../components/BackButton";
import {useUnit} from "effector-react";
import {$userGetStatus, getUserEvent, getUserFx} from "../../store/user";
import styles from "./style.module.scss";
import Title from "antd/es/typography/Title";
import {useNotification} from "../../hooks/useNotification";

export const UserPage: React.FC = () => {
  const {user} = useParams();
  const [{loading, error, data: userData}, getUser] = useUnit([$userGetStatus, getUserEvent, getUserFx.pending]);
  const {contextHolder, setMessageData} = useNotification(error);

  useEffect(() => {
    setMessageData(error);
  }, [error]);

  useEffect(() => {
    getUser({user});
  }, [user, getUser]);

  const getDescriptionData = (userData: UserData | null) =>
    userData
      ? Object.entries(userData).map(([key, value]) => ({
          key,
          label: key,
          children: value,
        }))
      : [];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        {contextHolder}
        <div className={styles.container}>
          <BackButton />
          User not found
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <img src={userData?.avatar_url} alt={userData?.login} className={styles["user__image"]} />
      <Title level={3}>Hello, my name is {userData?.login}. Here some information about me</Title>
      <Descriptions layout="vertical" items={getDescriptionData(userData)} bordered />
    </div>
  );
};
