import * as types from "./types";
import * as utils from "./utils";
import { createReducer } from "../../utils";
import { FULFILLED } from "../../../utilities";

const initialState = [];

const cartReducer = createReducer(initialState)({
  [types.GET_SKILLS + FULFILLED]: (state, action) => {
    return action.payload.data;
  }
});

export default cartReducer;
