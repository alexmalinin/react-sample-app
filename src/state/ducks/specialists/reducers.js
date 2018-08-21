import { SHOW_PROJECT_TEAM, SHOW_TEAM_CHANNELS } from "../teams/types";
import { ADD_TO_CHANNEL, REMOVE_FROM_CHANNEL } from "../channels/types";
import { FULFILLED } from "@utilities";

const specialists = (state = {}, action) => {
  switch (action.type) {
    case SHOW_PROJECT_TEAM + FULFILLED:
    case SHOW_TEAM_CHANNELS + FULFILLED:
    case ADD_TO_CHANNEL:
    case REMOVE_FROM_CHANNEL:
      return { ...state, ...action.payload.entities.specialists };
    default:
      return state;
  }
};

export default specialists;
