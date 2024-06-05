import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUnit} from "effector-react";
import {Table, Pagination, message} from "antd";

import {Loader} from "../../components/Loader";
import {Navbar} from "../../components/Navbar";

import {$responseUser, $users, $usersCount, Gate, handlePageEvent, searchUsersFx} from "../../store/users";
import styles from "./style.module.scss";
import {columns} from "./constants/columnsData";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, usersCount, responseUser, isLoading, handlePage] = useUnit([
    $users,
    $usersCount,
    $responseUser,
    searchUsersFx.pending,
    handlePageEvent,
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (responseUser.message) {
      messageApi.open({
        type: "error",
        content: responseUser.message,
      });
    }
  }, [responseUser]);

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
      <Navbar isLoading={isLoading} />
      <div className={styles["main__content"]}>
        {isLoading ? (
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
