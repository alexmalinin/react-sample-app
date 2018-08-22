import { createSelector } from "reselect";
import { S_REDGUY, SPECIALIST, CLIENT } from "@utilities";

export const isSpecialist = () =>
  createSelector(state => state.type === SPECIALIST, value => value);

export const isClient = () =>
  createSelector(state => state.type === CLIENT, value => value);

export const isRedguy = () =>
  createSelector(state => state.role === S_REDGUY, value => value);
