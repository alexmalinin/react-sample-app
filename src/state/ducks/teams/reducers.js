import * as types from "./types";
import { combineReducers } from "redux";
import omit from "lodash/omit";
import merge from "lodash/merge";

import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "@utilities";
import { CREATE_CHANNEL, DELETE_CHANNEL } from "../channels/types";

const teamsById = createReducer({})({
  [types.SHOW_TEAMS + FULFILLED]: (state, { payload }) => ({
    ...merge({ ...state }, payload.entities.teams)
  }),

  [types.SHOW_CUSTOM_TEAMS]: (state, { payload }) => ({
    ...state
    // ...payload.data
  }),

  [types.SHOW_PROJECT_TEAM + FULFILLED]: (state, { payload }) => ({
    ...state,
    ...payload.entities.team
  }),

  [types.CREATE_CUSTOM_TEAM + FULFILLED]: (state, { payload }) => ({
    ...merge({ ...state }, payload.entities.team)
  }),

  [types.DELETE_CUSTOM_TEAM + FULFILLED]: (state, { payload }) => ({
    ...omit(state, payload.data.id)
  }),

  [CREATE_CHANNEL]: (state, { payload }) => {
    const { team_id, id } = payload;
    const team = state[team_id];

    return {
      ...state,
      [team_id]: {
        ...team,
        channels: team.channels.concat(id)
      }
    };
  },

  [DELETE_CHANNEL]: (state, { payload }) => {
    const { team_id, id } = payload;
    const team = state[team_id];

    return {
      ...state,
      [team_id]: {
        ...team,
        channels: team.channels.filter(channel => channel !== id)
      }
    };
  }
});

const allTeams = createReducer([])({
  [types.SHOW_TEAMS + FULFILLED]: (state, { payload }) => payload.result,

  [types.DELETE_CUSTOM_TEAM + FULFILLED]: (state, { payload }) =>
    state.filter(id => id !== payload.data.id),

  [types.CREATE_CUSTOM_TEAM + FULFILLED]: (state, { payload }) =>
    state.concat(payload.result)
});

const teamsReducer = combineReducers({
  byId: teamsById,
  allIds: allTeams
});

export default teamsReducer;
