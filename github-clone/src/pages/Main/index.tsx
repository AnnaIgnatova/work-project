import { useEffect, useState } from "react";
import { octokit } from "../../api/octokit";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import styles from "./style.module.scss";
import { Loader } from "../../components/Loader";

export const MainPage: React.FC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    octokit
      .request("GET /search/users?q=followers:%3E10")
      .then((res) => {
        setData(res.data.items);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Header />
      <div className={styles["main__container"]}>
        <Navbar />
        <div className={styles["main__content"]}>
          {isLoading ? (
            <Loader />
          ) : (
            <Table dataSource={data} className={styles["main__table"]}>
              <Column title="ID" dataIndex="id" key="id" />
              <Column title="Login" dataIndex="login" key="login" />
              <Column title="Score" dataIndex="score" key="score" />
              <Column
                title="Repositories"
                dataIndex="repos_url"
                key="repos_url"
              />
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
