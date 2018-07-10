import axios from "axios";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, userConfirmationToken, user, ...rest } = action;
  if (!userConfirmationToken) return next(action);

  const token = localStorage.getItem("jwt_token");

  // Client

  if (user === "customer") {
    return axios({
      method: "get",
      url: userConfirmationToken,

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function(response) {
        return next({ ...rest, type: type + SUCCESS, id: response.data["id"] });
      })
      .catch(function(error) {
        console.log(error);
      });

    // Specialists
  } else {
    return axios({
      method: "get",
      url: userConfirmationToken
    })
      .then(function(response) {
        return next({ ...rest, type: type + SUCCESS, id: response.data["id"] });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
