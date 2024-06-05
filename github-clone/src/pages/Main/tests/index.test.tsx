import {render} from "@testing-library/react";
import App from "../../../App";
import {columns} from "../constants/columnsData";
import {Table} from "antd";

describe("Main Page", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("render table row", () => {
    const users = [
      {
        login: "torvalds",
        id: 1024025,
        node_id: "MDQ6VXNlcjEwMjQwMjU=",
        avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/torvalds",
        html_url: "https://github.com/torvalds",
        followers_url: "https://api.github.com/users/torvalds/followers",
        following_url: "https://api.github.com/users/torvalds/following{/other_user}",
        gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
        starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
        organizations_url: "https://api.github.com/users/torvalds/orgs",
        repos_url: "https://api.github.com/users/torvalds/repos",
        events_url: "https://api.github.com/users/torvalds/events{/privacy}",
        received_events_url: "https://api.github.com/users/torvalds/received_events",
        type: "User",
        site_admin: false,
        score: 1.0,
      },
      {
        login: "gustavoguanabara",
        id: 8683378,
        node_id: "MDQ6VXNlcjg2ODMzNzg=",
        avatar_url: "https://avatars.githubusercontent.com/u/8683378?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/gustavoguanabara",
        html_url: "https://github.com/gustavoguanabara",
        followers_url: "https://api.github.com/users/gustavoguanabara/followers",
        following_url: "https://api.github.com/users/gustavoguanabara/following{/other_user}",
        gists_url: "https://api.github.com/users/gustavoguanabara/gists{/gist_id}",
        starred_url: "https://api.github.com/users/gustavoguanabara/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/gustavoguanabara/subscriptions",
        organizations_url: "https://api.github.com/users/gustavoguanabara/orgs",
        repos_url: "https://api.github.com/users/gustavoguanabara/repos",
        events_url: "https://api.github.com/users/gustavoguanabara/events{/privacy}",
        received_events_url: "https://api.github.com/users/gustavoguanabara/received_events",
        type: "User",
        site_admin: false,
        score: 1.0,
      },
    ];
    const table = render(<Table dataSource={users} columns={columns} />);
    const tableRow = table.getByText("torvalds");

    expect(tableRow).toBeInTheDocument();
  });
});
