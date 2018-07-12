import axios from "axios";
import { CONFIRM_PASSWORDS, SUCCESS } from "../actions/types";

export default store => next => action => {
  const { type, verification, user, payload, ...rest } = action;
  if (!verification) return next(action);

  return axios({
    method: "put",
    url: verification,
    data: {
      [user]: {
        password: `${payload["password"]}`,
        password_confirmation: `${payload["password_confirmation"]}`
      }
    }
  })
    .then(response => {
      console.log("response", response);
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .then(() => {
      return next({ ...rest, type: CONFIRM_PASSWORDS + SUCCESS, data: true });
    })
    .catch(error => {
      console.log({
        [user]: {
          password: `${payload["password"]}`,
          password_confirmation: `${payload["password_confirmation"]}`
        }
      });
      console.log(error);
    });
};
