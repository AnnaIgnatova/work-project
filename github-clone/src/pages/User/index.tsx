import { useEffect, useState } from "react";
import { octokit } from "../../api/octokit";
import { useParams } from "react-router-dom";
import { Descriptions, DescriptionsProps } from "antd";
import { Loader } from "../../components/Loader";

export const UserPage: React.FC = () => {
  const { user } = useParams();
  const [userData, setUserData] = useState<
    DescriptionsProps["items"] | undefined
  >([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = () => {
      setLoading(true);
      octokit
        .request(`GET /users/${user}`)
        .then((res) => {
          console.log(res.data);
          const data: Record<string, string> = res.data;
          const items = Object.entries(data).map(([key, value]) => ({
            key,
            label: key,
            children: value,
          }));
          setUserData(items);
        })
        .finally(() => setLoading(false));
    };

    getUser();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Descriptions title="User Info" items={userData} bordered />
      )}
    </>
  );
};
