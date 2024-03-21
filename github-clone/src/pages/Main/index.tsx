import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { Navbar } from "../../components/Navbar";
import { Table } from "antd";
import styles from "./style.module.scss";
import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";
import { $users, searchUsersFx } from "../../store/users";

export const MainPage: React.FC = () => {
  const [users, getUsersData] = useUnit([$users, searchUsersFx]);
  const [searchName, setSearchName] = useState<string>("");
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (value: string) => {
        return <Link to={`/${value}`}>{value}</Link>;
      },
      sorter: (a: Data, b: Data) => a.id - b.id,
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      render: (value: string) => {
        return <Link to={`/${value}`}>{value}</Link>;
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (value: string) => {
        return <Link to={`/${value}`}>{value}</Link>;
      },
    },
    {
      title: "Repositories",
      dataIndex: "repos_url",
      key: "repos_url",
      render: (value: string) => {
        return <Link to={`/${value}`}>{value}</Link>;
      },
    },
  ];

  useEffect(() => {
    getUsersData({ searchName, followersCount }).then(() => {
      setLoading(false);
    });
  }, [searchName, followersCount]);

  return (
    <>
      <Navbar
        setFollowersCount={setFollowersCount}
        setSearchName={setSearchName}
      />
      <div className={styles["main__content"]}>
        {isLoading ? (
          <Loader />
        ) : (
          <Table
            dataSource={users}
            className={styles["main__table"]}
            columns={columns}
          />
        )}
      </div>
    </>
  );
};
