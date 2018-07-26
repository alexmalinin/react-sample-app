import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  teams: {},
  error: null
};

const teamsReducer = createReducer(initialState)({
  [types.SHOW_TEAMS]: (state, { payload }) => ({
    ...state,
    teams: {
      ...state.teams,
      ...payload
    }
  }),

  [types.SHOW_CUSTOM_TEAMS]: (state, { payload }) => ({
    ...state,
    teams: {
      ...state.teams,
      ...payload
    }
  }),

  [types.CUSTOM_TEAM_CREATE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.CUSTOM_TEAM_CREATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    teams: {
      ...state.teams,
      [payload.data.id]: payload.data
    }
  }),

  [types.CUSTOM_TEAM_CREATE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),

  [types.CUSTOM_TEAM_DELETE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.CUSTOM_TEAM_DELETE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    teams: {
      ...omit(state.teams, payload.data.id)
    }
  }),

  [types.CUSTOM_TEAM_DELETE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  })
});

export default teamsReducer;
