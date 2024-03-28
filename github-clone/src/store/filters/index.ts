import { createEvent, createStore, sample } from "effector";

export const $userName = createStore<string>("");

export const $followersMinCount = createStore<number>(0);

export const changeUserNameEvent =
  createEvent<React.ChangeEvent<HTMLInputElement>>();

export const changeFollowersMinCount =
  createEvent<React.ChangeEvent<HTMLInputElement>>();

sample({
  clock: changeUserNameEvent,
  fn: (e) => e.target.value,
  target: $userName,
});

sample({
  clock: changeFollowersMinCount,
  fn: (e) => +e.target.value,
  target: $followersMinCount,
});
