import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";

export default store => next => action => {
  const { type, signUp, user, payload, ...rest } = action;
  if (!signUp) return next(action);

  next({ ...rest, type: type, data: payload });

  return axios({
    method: "post",
    url: signUp,
    data: {
      [user]: {
        email: payload["email"],
        terms: true
      }
    }
  })
    .then(function(response) {
      localStorage.setItem("user_email", response.data.email);
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      return next({ ...rest, type: type + FAIL, data: error });
    });
};
