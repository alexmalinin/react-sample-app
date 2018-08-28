import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initialState = null;

const submitErrorModalReducer = createReducer(initialState)({
  [types.SUBMIT_ERROR_MODAL_SHOW]: (state, action) => {
    return true;
  },

  [types.SUBMIT_ERROR_MODAL_CLOSE]: (state, action) => {
    return false;
  }
});

const confirmSubmitModalReducer = createReducer(initialState)({
  [types.CONFIRM_SUBMIT_MODAL_SHOW]: (state, { payload }) => {
    return {
      ...payload
    };
  },

  [types.CONFIRM_SUBMIT_MODAL_CLOSE]: (state, action) => {
    return null;
  }
});

export default combineReducers({
  submitError: submitErrorModalReducer,
  confirmSubmit: confirmSubmitModalReducer
});
