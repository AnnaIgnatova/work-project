import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUnit} from "effector-react";
import {Table, Pagination} from "antd";

import {Loader} from "../../components/Loader";
import {Navbar} from "../../components/Navbar";

import {$users, $usersCount, $usersGetStatus, Gate, handlePageEvent} from "../../store/users";
import styles from "./style.module.scss";
import {columns} from "./constants/columnsData";
import {useNotification} from "../../hooks/useNotification";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, usersCount, {loading, error}, handlePage] = useUnit([
    $users,
    $usersCount,
    $usersGetStatus,
    handlePageEvent,
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const {contextHolder, setMessageData} = useNotification(error);

  useEffect(() => {
    setMessageData(error);
  }, [error]);

  const rowHandler = (login: string) => () => {
    navigate(`/${login}`);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    handlePage(page);
  };

  return (
    <>
      {contextHolder}
      <Gate />
      <Navbar isLoading={loading} />
      <div className={styles["main__content"]}>
        {loading ? (
          <Loader />
        ) : (
          <div className={styles["main__table-container"]}>
            <Table
              dataSource={users}
              className={styles["main__table"]}
              scroll={{x: true}}
              columns={columns}
              onRow={({login}) => ({
                onClick: rowHandler(login),
              })}
              pagination={false}
            />
            <Pagination
              showSizeChanger={false}
              className={styles["main__pagination"]}
              onChange={onChangePage}
              total={Math.min(usersCount, 1000)}
              current={currentPage}
              pageSize={30}
            />
          </div>
        )}
      </div>
    </>
  );
};
