import axios from "axios";
import { CONFIRM_PASSWORDS, SUCCESS } from "../actions/types";

export default store => next => action => {
  const { type, verification, user, payload, ...rest } = action;
  if (!verification) return next(action);

  // Client

  if (user === "customers") {
    return axios({
      method: "put",
      url: verification,
      data: {
        customer: {
          password: `${payload["password"]}`,
          password_confirmation: `${payload["password_confirmation"]}`
        }
      }
    })
      .then(function(response) {
        console.log("response", response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });
      })
      .then(function() {
        return next({ ...rest, type: CONFIRM_PASSWORDS + SUCCESS, data: true });
      })
      .catch(function(error) {
        console.log({
          customer: {
            password: `${payload["password"]}`,
            password_confirmation: `${payload["password_confirmation"]}`
          }
        });
        console.log(error);
      });

    // Specialists
  } else {
    return axios({
      method: "put",
      url: verification,
      data: {
        specialist: {
          password: `${payload["password"]}`,
          password_confirmation: `${payload["password_confirmation"]}`
        }
      }
    })
      .then(function(response) {
        console.log("response", response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });
      })
      .then(function() {
        return next({ ...rest, type: CONFIRM_PASSWORDS + SUCCESS, data: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
