import { createEffect, createEvent, createStore, sample } from "effector";
import { octokit } from "../../api/octokit";
import { UserData } from "./types";

export const $users = createStore<UserData[]>([]);

export const searchUsersEvent = createEvent<any>();

export interface SearchUsersParams {
  searchName: string;
  followersCount: number;
}

export const searchUsersFx = createEffect(async (params: SearchUsersParams) => {
  const { searchName, followersCount } = params;
  const res = await octokit.request(
    `GET /search/users?q=${
      searchName.length ? `${searchName}+in%3Alogin+` : ""
    }followers:>${followersCount}+created:>2011-01-01`
  );
  return res.data.items;
});

sample({
  clock: searchUsersEvent,
  target: searchUsersFx,
});

sample({
  clock: searchUsersFx.doneData,
  target: $users,
});
