import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED } from "../../../utilities";

const initialState = [];

const skillsReducer = createReducer(initialState)({
  [types.GET_SKILLS]: (state, action) => {
    return action.payload;
  }
});

export default skillsReducer;
