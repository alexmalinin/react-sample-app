import * as types from "./types";
import { fetch } from "../../utils";
import { POST } from "../../../utilities";

export const signIn = (user, data) => ({
  type: types.SIGN_IN,
  payload: fetch(POST, `/${user}/auth/login`, data)
});
