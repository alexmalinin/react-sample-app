import decode from "jwt-decode";
import * as types from "./types";
import { createReducer } from "../../utils";
import { getUserType } from "@utilities";
import { PENDING } from "../../../utilities";

const signInReducer = createReducer({})({
  [types.SIGN_IN]: (state, { token }) => {
    const { user_id: id, aud: role, status } = decode(token);

    return {
      token,
      id,
      type: getUserType(role),
      role,
      status
    };
  },

  [types.SIGN_IN_FAIL]: (state, payload) => ({
    signInFail: true
  }),

  [types.LOG_OUT]: (state, action) => {
    localStorage.clear();

    return {};
  },

  [types.SIGN_UP + PENDING]: (state, payload) => ({
    ...state,
    loading: true
  })
});

export default signInReducer;
