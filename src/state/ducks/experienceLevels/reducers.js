import * as types from "./types";
import { createReducer } from "../../utils";
import {
  FULFILLED,
  PENDING,
  REJECTED,
  prepareForSelect
} from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  experienceLevels: [],
  error: false
};

const experienceLevelsReducer = createReducer(initialState)({
  [types.GET_EXPERIENCE_LEVELS + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.GET_EXPERIENCE_LEVELS + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    experienceLevels: prepareForSelect(payload.data),
    error: false
  }),

  [types.GET_EXPERIENCE_LEVELS + REJECTED]: (state, action) => ({
    ...state,
    error: true
  })
});

export default experienceLevelsReducer;
