import axios from "axios";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, userConfirmationToken, user, ...rest } = action;
  if (!userConfirmationToken) return next(action);

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
};
