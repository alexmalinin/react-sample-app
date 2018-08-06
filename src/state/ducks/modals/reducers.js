import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initialState = false;

const submitErrorModalReducer = createReducer(initialState)({
  [types.SUBMIT_ERROR_MODAL_SHOW]: (state, action) => {
    return true;
  },

  [types.SUBMIT_ERROR_MODAL_CLOSE]: (state, action) => {
    return false;
  }
});

export default combineReducers({
  submitErrorModal: submitErrorModalReducer
});
