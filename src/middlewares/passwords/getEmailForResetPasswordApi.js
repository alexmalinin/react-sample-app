import axios from "axios";
import { SUCCESS, FAIL } from "../../constants/constants";

export default store => next => action => {
  const { type, getTokenForResetPassword, payload, ...rest } = action;
  if (!getTokenForResetPassword) return next(action);

  return axios({
    method: "post",
    url: getTokenForResetPassword,
    data: payload
  })
    .then(function(response) {
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(error => {
      const {
        response: { data }
      } = error;
      console.log(error);

      return next({
        ...rest,
        type: type + FAIL,
        data: data && data.errors
      });
    });
};
