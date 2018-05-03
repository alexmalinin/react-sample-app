import axios from "axios";
import { SUCCESS } from "../../constans/constans";

export default store => next => action => {
  const { type, getTokenForResetPassword, payload, ...rest } = action;
  if (!getTokenForResetPassword) return next(action);

  return axios({
    method: "post",
    url: getTokenForResetPassword,
    data: payload
  })
    .then(function(response) {
      console.log("sucess");
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
