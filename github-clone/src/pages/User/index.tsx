import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Descriptions } from "antd";
import { Loader } from "../../components/Loader";
import { UserData } from "../../store/users/types";
import { BackButton } from "../../components/BackButton";
import { useUnit } from "effector-react";
import { $userData, getUserEvent, getUserFx } from "../../store/user";
import styles from "./style.module.scss";
import Title from "antd/es/typography/Title";

export const UserPage: React.FC = () => {
  const { user } = useParams();
  const [userData, getUser, isLoading] = useUnit([
    $userData,
    getUserEvent,
    getUserFx.pending,
  ]);

  useEffect(() => {
    getUser({ user });
  }, [user, getUser]);

  const getDescriptionData = (userData: UserData | null) =>
    userData
      ? Object.entries(userData).map(([key, value]) => ({
          key,
          label: key,
          children: value,
        }))
      : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <BackButton />
          <img
            src={userData?.avatar_url}
            alt={userData?.login}
            className={styles["user__image"]}
          />
          <Title level={3}>
            Hello, my name is {userData?.login}. Here some information about me
          </Title>
          <Descriptions
            layout="vertical"
            items={getDescriptionData(userData)}
            bordered
          />
        </div>
      )}
    </>
  );
};
