import { createSelector } from "reselect";
import { S_REDGUY, SPECIALIST, CLIENT } from "@utilities";

export const isSpecialist = createSelector(
  state => state.user.type === SPECIALIST,
  value => value
);

export const isClient = createSelector(
  state => state.user.type === CLIENT,
  value => value
);

export const isRedguy = createSelector(
  state => state.user.role === S_REDGUY,
  value => value
);
