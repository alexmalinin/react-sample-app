import * as types from "./types";
import { fetch } from "../../utils";
import { POST } from "../../../utilities";

export const signIn = (user, data) => {
  return dispatch => {
    dispatch({
      type: types.SIGN_IN,
      payload: fetch(POST, `/${user}/auth/login`, data)
    }).then(({ value: { data } }) => {
      localStorage.setItem("jwt_token", data.access_token);
    });
  };
};
