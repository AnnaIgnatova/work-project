import { createEffect, createEvent, createStore, sample } from "effector";
import { octokit } from "../../api/octokit";
import { GetUsersRequest, UserData } from "./types";
import { createGate } from "effector-react";
import { $followersMinCount, $userName } from "../filters";
import { $currentPage } from "../pagination";

export const $users = createStore<UserData[]>([]);

export const $usersCount = createStore<number>(0);

export const getUsersEvent = createEvent();

export interface SearchUsersParams {
  searchName?: string;
  followersCount?: number;
  page?: number;
}

export const searchUsersFx = createEffect(
  async (params?: SearchUsersParams) => {
    const { searchName, followersCount, page } = params || {};
    const res = await octokit.request(
      `GET /search/users?q=${
        searchName?.length ? `${searchName}+in%3Alogin+` : ""
      }${
        followersCount ? `followers:>${followersCount}` : ""
      }+created:>2011-01-01`,
      {
        page,
      }
    );
    return res.data;
  }
);

export const Gate = createGate("gate with props");

Gate.open.watch(() => {
  getUsersEvent();
});

// вопрос: как передать 2 параметра

sample({
  clock: getUsersEvent,
  source: $userName,
  fn: ($userName) => ($userName ? { searchName: $userName } : {}),
  target: searchUsersFx,
});

// вопрос: можно ли как то объединить функции ниже

sample({
  clock: searchUsersFx.doneData,
  fn: (data: GetUsersRequest) => data.items,
  target: $users,
});

sample({
  clock: searchUsersFx.doneData,
  fn: (data: GetUsersRequest) => data.total_count,
  target: $usersCount,
});
