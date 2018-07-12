import axios from "axios";
import { SUCCESS } from "../../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, editBilling, payload, ...rest } = action;
  if (!editBilling) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  console.log({
    billing: payload
  });

  axios({
    method: "put",
    url: editBilling + user_id,
    data: {
      billing: payload
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
