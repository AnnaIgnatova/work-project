import { useEffect, useState } from "react";
import { octokit } from "../../api/octokit";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import styles from "./style.module.scss";
import { Loader } from "../../components/Loader";

interface Data {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

export const MainPage: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, [searchName, followersCount]);

  const getData = async () => {
    octokit
      .request(
        `GET /search/users?q=${
          searchName.length ? `${searchName}+in%3Aname+` : ""
        }followers:>${followersCount}+created:>2011-01-01`
      )
      .then((res) => {
        console.log(res.data.items);
        setData(res.data.items);
      })
      .finally(() => setLoading(false));

    // const testPromiseAll = await Promise.all([
    //   octokit.request("GET /search/repositories?q=A").then((res) => res.data),
    //   octokit.request("GET /search/repositories?q=B").then((res) => res.data),
    // ]);

    // const testPromiseAllSettled = await Promise.allSettled([
    //     octokit.request("GET /search/repositories?q=A").then((res) => res.data),
    //     octokit.request("GET /search/repositories?q=B").then((res) => res.data),
    //   ]);

    //   const testPromiseRace= await Promise.race([
    //     octokit.request("GET /search/repositories?q=A").then((res) => res.data),
    //     octokit.request("GET /search/repositories?q=B").then((res) => res.data),
    //   ]);

    // const testPromiseAny = await Promise.any([
    //   octokit.request("GET /search/repositories?q=A").then((res) => res.data),
    //   octokit.request("GET /search/repositories?q=B").then((res) => res.data),
    // ]);

    // console.log('promise all', testPromiseAll);
    // console.log('promise all settled', testPromiseAllSettled);
    // console.log('promise race', testPromiseRace);
    // console.log("promise any", testPromiseAny);
  };

  return (
    <div>
      <Header />
      <div className={styles["main__container"]}>
        <Navbar
          setFollowersCount={setFollowersCount}
          setSearchName={setSearchName}
        />
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
