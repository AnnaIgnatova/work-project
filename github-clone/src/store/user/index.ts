import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import {UserData} from "../users/types";
import {octokit} from "../../api/octokit";

export interface GetUserParams {
  user?: string;
}

export const $userData = createStore<UserData | null>(null);

export const getUserEvent = createEvent<GetUserParams>();

export const getUserFx = createEffect(async (params?: GetUserParams) => {
  const {user} = params || {};
  const res = await octokit.request(`GET /users/${user}`);
  return res.data;
});

export const $fetchError = restore<Error>(getUserFx.failData, null);

export const $userGetStatus = combine({
  loading: getUserFx.pending,
  error: $fetchError,
  data: $userData,
});

sample({
  clock: getUserEvent,
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $userData,
});

