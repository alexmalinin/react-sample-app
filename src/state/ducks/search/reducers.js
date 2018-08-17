import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  result: [],
  error: false
};

const searchReducer = createReducer(initialState)({
  [types.SEARCH_SPECIALIST + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.SEARCH_SPECIALIST + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    result: [...payload.data]
  }),

  [types.SEARCH_SPECIALIST + REJECTED]: (state, action) => ({
    ...state,
    error: true
  }),

  [types.SEARCH_SPECIALIST_FOR_PROJECT + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.SEARCH_SPECIALIST_FOR_PROJECT + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: false,
    result: [...payload.data]
  }),

  [types.SEARCH_SPECIALIST_FOR_PROJECT + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  })
});

export default searchReducer;
