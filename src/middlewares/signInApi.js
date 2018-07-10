import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";

export default store => next => action => {
  const { type, signIn, payload, ...rest } = action;
  if (!signIn) return next(action);

  next({ ...rest, type: type, data: payload });

  let firstLogin;
  const token = localStorage.getItem("jwt_token");

  axios({
    method: "post",
    url: signIn,
    data: {
      email: payload["email"],
      password: payload["password"]
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      localStorage.setItem("jwt_token", response.data.access_token);
      return next({
        ...rest,
        type: type + SUCCESS,
        data: response.data,
        firstLogin: firstLogin
      });
    })
    .catch(function(error) {
      console.log(error);
      return next({ ...rest, type: type + FAIL, data: null });
    });
};
