import * as types from "./types";
import { fetch, selectors } from "../../utils";
import { POST, GET, getUserUrl } from "@utilities";
import { setAuthorizationHeader } from "./utils";

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
