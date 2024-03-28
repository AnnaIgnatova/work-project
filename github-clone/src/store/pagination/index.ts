import { createStore, createEvent, sample } from "effector";
import { searchUsersFx } from "../users";
import { GetUsersRequest } from "../users/types";

export const $usersCount = createStore<number>(0);

export const $currentPage = createStore<number>(1);

export const handlePageEvent = createEvent<any>();

sample({
  clock: searchUsersFx.doneData,
  fn: (data: GetUsersRequest) => data.total_count,
  target: $usersCount,
});

sample({
  clock: handlePageEvent,
  target: $currentPage,
});

sample({
  clock: handlePageEvent,
  fn: ($currentPage) => ($currentPage ? { page: $currentPage } : {}),
  target: searchUsersFx,
});
