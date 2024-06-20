import {Button, Form, Input} from "antd";
import {useUnit} from "effector-react";
import {
  $createdBy,
  $followersMinCount,
  $userName,
  changeDateCreatedBy,
  changeFollowersMinCount,
  changeUserNameEvent,
} from "../../../store/filters";
import {getUsersEvent} from "../../../store/users";

interface NavbarFormProps {
  isLoading: boolean;
}

export const NavbarForm: React.FC<NavbarFormProps> = ({isLoading}) => {
  const [userName, followers, createdBy, changeName, setFollowers, changeDate] = useUnit([
    $userName,
    $followersMinCount,
    $createdBy,
    changeUserNameEvent,
    changeFollowersMinCount,
    changeDateCreatedBy,
  ]);

  const getUsers = () => getUsersEvent();

  return (
    <Form layout="vertical" disabled={isLoading}>
      <Form.Item label="Name">
        <Input placeholder="Name" aria-label="name-input" value={userName} onChange={changeName} />
      </Form.Item>
      <Form.Item label="Followers count from">
        <Input
          type="number"
          aria-label="followers-input"
          placeholder="Followers count from"
          value={followers}
          onChange={setFollowers}
        />
      </Form.Item>
      <Form.Item label="Created by">
        <Input placeholder="Created by" aria-label="date-input" type="date" value={createdBy} onChange={changeDate} />
      </Form.Item>
      <Form.Item>
        <Button onClick={getUsers} type="primary">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
