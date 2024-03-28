import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { Table, Pagination } from "antd";

import { Loader } from "../../components/Loader";
import { Navbar } from "../../components/Navbar";

import { $users, Gate, searchUsersFx } from "../../store/users";
import { UserData } from "../../store/users/types";

import styles from "./style.module.scss";
import { handlePageEvent } from "../../store/pagination";

// вопрос: куда переместить структуру
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a: UserData, b: UserData) => a.id - b.id,
  },
  {
    title: "Login",
    dataIndex: "login",
    key: "login",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    sorter: (a: UserData, b: UserData) => a.score - b.score,
  },
  {
    title: "Repositories",
    dataIndex: "repos_url",
    key: "repos_url",
  },
];

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, isLoading] = useUnit([$users, searchUsersFx.pending]);
  const [currentPage, setCurrentPage] = useState(0);

  const rowHandler = (login: string) => () => {
    navigate(`/${login}`);
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
    handlePageEvent(page);
  };

  return (
    <>
      <Gate />
      <Navbar />
      <div className={styles["main__content"]}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles["main__table-container"]}>
            <Table
              dataSource={users}
              className={styles["main__table"]}
              scroll={{ x: true }}
              columns={columns}
              onRow={({ login }) => ({
                onClick: rowHandler(login),
              })}
              pagination={false}
            />
            <Pagination
              className={styles["main__pagination"]}
              onChange={handlePage}
              total={1000}
              current={currentPage}
              pageSize={30}
            />
          </div>
        )}
      </div>
    </>
  );
};
