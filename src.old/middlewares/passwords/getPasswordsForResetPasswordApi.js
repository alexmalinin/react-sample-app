import axios from "axios";
import { SUCCESS } from "../../constants/constants";

export default store => next => action => {
  const { type, getPasswordsForResetPassword, payload, ...rest } = action;
  if (!getPasswordsForResetPassword) return next(action);

  console.log({
    reset_password: payload
  });

  return axios({
    method: "put",
    url: getPasswordsForResetPassword,
    data: {
      reset_password: payload
    }
  })
    .then(function() {
      return next({ ...rest, type: type + SUCCESS, data: { reset: "sucess" } });
    })
    .catch(function(error) {
      console.log(error);
    });
};
