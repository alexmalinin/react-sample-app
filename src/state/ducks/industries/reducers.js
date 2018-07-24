import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED } from "../../../utilities";

const initialState = [];

const industriesReducer = createReducer(initialState)({
  [types.GET_INDUSTRIES + FULFILLED]: (state, action) => {
    return action.payload.data;
  }
});

export default industriesReducer;
