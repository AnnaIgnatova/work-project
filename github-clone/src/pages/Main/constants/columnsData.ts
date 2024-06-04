import { UserData } from "../../../store/users/types";

export const columns = [
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
