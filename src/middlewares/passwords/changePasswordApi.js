import axios from "axios";
import { SUCCESS, FAIL } from "../../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const {
    type,
    changePassword1,
    changePassword2,
    payload,
    user,
    ...rest
  } = action;
  if (!changePassword1) return next(action);

  // next({ ...rest, type: type, data: payload });

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "put",
    url: changePassword1 + id + changePassword2,
    data: {
      [user]: payload
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successPasswordId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.errorPasswordId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
