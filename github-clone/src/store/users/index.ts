import { createEffect, createEvent, createStore, sample } from "effector";
import { octokit } from "../../api/octokit";
import { GetUsersRequest } from "./types";
import { createGate } from "effector-react";
import { $createdBy, $followersMinCount, $userName } from "../filters";

export const $responseUser = createStore<GetUsersRequest>({
  items: [],
  total_count: 0,
});

export const $currentPage = createStore<number>(1);

export const getUsersEvent = createEvent();

export interface SearchUsersParams {
  searchName?: string;
  followersCount?: number;
  page?: number;
  createdBy?: string;
}

export const searchUsersFx = createEffect(
  async (params?: SearchUsersParams) => {
    const { searchName, followersCount, createdBy, page } = params || {};
    const res = await octokit.request(
      `GET /search/users?q=${
        searchName?.length ? `${searchName}+in%3Alogin+` : ""
      }${followersCount ? `followers:>${followersCount}` : ""}+${
        createdBy ? `created:>${createdBy}` : "created:>2011-01-01"
      }`,
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

sample({
  clock: [getUsersEvent, $currentPage],
  source: [$userName, $followersMinCount, $createdBy, $currentPage],
  fn: ([userName, followersMinCount, createdBy, currentPage]) => ({
    searchName: userName,
    followersCount: followersMinCount,
    createdBy,
    page: currentPage,
  }),
  target: searchUsersFx,
});

sample({
  clock: searchUsersFx.doneData,
  target: $responseUser,
});

export const $users = $responseUser.map(({ items }) => items);

export const $usersCount = $responseUser.map(({ total_count }) => total_count);

export const handlePageEvent = createEvent<number>();

sample({
  clock: handlePageEvent,
  target: $currentPage,
});
