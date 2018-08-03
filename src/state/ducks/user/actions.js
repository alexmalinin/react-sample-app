import * as types from "./types";
import { fetch } from "../../utils";
import { POST } from "@utilities";
import { setAuthorizationHeader } from "./utils";

export const userLoggedIn = token => ({
  type: types.SIGN_IN,
  token
});

export const userLoggedOut = () => ({
  type: types.LOG_OUT
});

export const login = (user, data) => dispatch =>
  fetch(POST, `/${user}/auth/login`, data).then(user => {
    debugger;
    localStorage.jwt_token = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("jwt_token");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};
