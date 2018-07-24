import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  teams: [],
  error: null
};

const teamsReducer = createReducer(initialState)({
  [types.SHOW_TEAMS]: (state, action) => ({
    ...state,
    teams: {
      ...state.teams,
      ...action.payload
    }
  }),

  [types.SHOW_CUSTOM_TEAMS]: (state, action) => ({
    ...state,
    teams: {
      ...state.teams,
      ...action.payload
    }
  }),

  [types.CUSTOM_TEAM_CREATE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.CUSTOM_TEAM_CREATE + FULFILLED]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    teams: {
      ...state.teams,
      [action.payload.id]: action.payload
    }
  })
});

export default teamsReducer;
