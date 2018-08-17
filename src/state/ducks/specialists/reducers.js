import { SHOW_PROJECT_TEAM, SHOW_TEAM_CHANNELS } from "../teams/types";
import { FULFILLED } from "@utilities";

const specialists = (state = {}, action) => {
  switch (action.type) {
    case SHOW_PROJECT_TEAM + FULFILLED:
    case SHOW_TEAM_CHANNELS + FULFILLED:
      return { ...state, ...action.payload.entities.specialists };
    default:
      return state;
  }
};

export default specialists;
