import * as types from "./types";
import { fetch, selectors } from "../../utils";
import { setAuthorizationHeader } from "./utils";

import {
  POST,
  GET,
  PUT,
  SPECIALIST,
  getUserUrl,
  createNotification
} from "@utilities";

export const userLoggedIn = token => ({
  type: types.SIGN_IN,
  token
});

export const userLogInFail = () => ({
  type: types.SIGN_IN_FAIL
});

export const userLoggedOut = () => ({
  type: types.LOG_OUT
});

export const login = (user, data) => dispatch =>
  fetch(POST, `/${user}/auth/login`, data)
    .then(({ data: { access_token } }) => {
      localStorage.jwt_token = access_token;
      setAuthorizationHeader(access_token);
      dispatch(userLoggedIn(access_token));
      dispatch(getUserData());
    })
    .catch(error => {
      dispatch(userLogInFail());

      console.error(error);
    });

export const logout = () => dispatch => {
  localStorage.removeItem("jwt_token");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const signUp = (user, data) => dispatch =>
  fetch(POST, `/${user}/auth/register`, data);

export const getUserData = () => (dispatch, getState) => {
  const state = getState(),
    userType = selectors.getUserType(state),
    id = selectors.getUserId(state);

  const url = getUserUrl(userType);

  dispatch({
    type: types.USER_DATA_SHOW,
    payload: fetch(GET, `/${url}/${id}`)
  });
};

export const changePassword = payload => (dispatch, getState) => {
  const state = getState(),
    userId = state.user.id,
    usertype = state.user.type,
    users = getUserUrl(usertype);

  const user = usertype === SPECIALIST ? "specialist" : "customer";

  const data = {
    [user]: {
      ...payload
    }
  };

  return fetch(PUT, `/${users}/${userId}/dashboard/password`, data);
};

export const getTokenForResetPassword = (user, payload) => dispatch =>
  fetch(POST, `/${user}s/password_request`, payload);

export const getPasswordsForResetPassword = (
  passwords,
  user,
  token
) => dispatch =>
  fetch(PUT, `/${user}/password_reset/${token}`, {
    reset_password: passwords
  });

export const getUserId = (user, token) => dispatch =>
  fetch(GET, `/${user}/${token}`)
    .then(({ data }) => {
      if (!data) {
        createNotification({
          type: "warning",
          text: "You have already created a password"
        });
      }

      return data;
    })
    .catch(error => {
      console.error(error);
    });

export const verifyPassword = (user, id, payload) => dispatch =>
  fetch(PUT, `/${user}s/${id}`, {
    [user]: {
      ...payload
    }
  });

/**
 * Client and Specialist get request to API for deleting confirmation token
 *
 * @param  {string} user user type
 * @param  {string} token user token
 */

export const deleteConfirmationToken = (user, token) => dispatch =>
  fetch(GET, `/${user}/confirmation/${token}`);
