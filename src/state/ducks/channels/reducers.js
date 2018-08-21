import * as types from "./types";
import omit from "lodash/omit";
import merge from "lodash/merge";
import { FULFILLED } from "@utilities";
import {
  SHOW_PROJECT_TEAM,
  SHOW_TEAM_CHANNELS,
  CREATE_CUSTOM_TEAM
} from "../teams/types";

const channelsReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_PROJECT_TEAM + FULFILLED:
    case CREATE_CUSTOM_TEAM + FULFILLED:
    case SHOW_TEAM_CHANNELS + FULFILLED:
      return merge({ ...state }, action.payload.entities.channels);
    case types.ADD_TO_CHANNEL:
    case types.REMOVE_FROM_CHANNEL:
      return { ...state, ...action.payload.entities.channels };
    case types.CREATE_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case types.DELETE_CHANNEL:
      return omit(state, action.payload.id);
    default:
      return state;
  }
};

export default channelsReducer;
