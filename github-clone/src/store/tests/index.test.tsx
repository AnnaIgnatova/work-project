import {getUserFx} from "../user";
import {searchUsersFx} from "../users";

describe("fetchData function", () => {
  it("get user data", async () => {
    const data = await getUserFx({user: "torvalds"});
    expect(data.id).toEqual(1024025);
  });
  it("get users data", async () => {
    const data = await searchUsersFx({followersCount: 123456});
    expect(data.items[0].login).toEqual("torvalds");
  });
});
