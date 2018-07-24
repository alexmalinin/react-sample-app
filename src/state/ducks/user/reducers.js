import * as types from "./types";
import * as utils from "./utils";
import { createReducer } from "../../utils";
import { FULFILLED } from "../../../utilities";

const initialState = [];

const specialistReducer = createReducer(initialState)({
  [types.USER_DATA_SHOW + FULFILLED]: (state, action) => {
    return action.payload.data;
  },

  [types.USER_PROFILE_UPDATE + FULFILLED]: (state, action) => {
    return action.payload.data;
  }
});

export default specialistReducer;
