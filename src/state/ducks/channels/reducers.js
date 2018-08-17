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
    default:
      return state;
  }
};

export default channelsReducer;
