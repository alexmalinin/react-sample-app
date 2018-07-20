import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING, SPECIALIST } from "../../../utilities";

const initialState = {
  loading: false,
  logged: false,
  userType: SPECIALIST
};

const signInReducer = createReducer(initialState)({
  [types.SIGN_IN + PENDING]: (state, action) => {
    return { ...state, loading: true, failSignIn: false };
  },
  [types.SIGN_IN + FULFILLED]: (state, action) => {
    return {
      ...state,
      access_token: action.payload.data.access_token,
      loading: false,
      logged: true
    };
  },
  [types.SIGN_IN + REJECTED]: (state, action) => {
    return {
      ...state,
      loading: false,
      failSignIn: true
    };
  }
});

export default signInReducer;
