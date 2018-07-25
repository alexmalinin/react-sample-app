import jwtDecode from "jwt-decode";
import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING } from "../../../utilities";
import { getUserType } from "./utils";

const getInitialState = () => {
  const token = localStorage.getItem("jwt_token");

  if (token) {
    const { user_id, aud, status } = jwtDecode(token);

    return {
      loading: false,
      status,
      auth: {
        userType: getUserType(aud),
        role: aud,
        id: user_id
      }
    };
  }

  return {
    loading: false,
    auth: {}
  };
};

const signInReducer = createReducer(getInitialState())({
  [types.SIGN_IN + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.SIGN_IN + FULFILLED]: (state, { payload }) => {
    const { user_id, aud, status } = jwtDecode(payload.data.access_token);

    return {
      ...state,
      loading: false,
      status,
      auth: {
        userType: getUserType(aud),
        role: aud,
        id: user_id
      }
    };
  },

  [types.SIGN_IN + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    failSignIn: true
  })
});

export default signInReducer;
