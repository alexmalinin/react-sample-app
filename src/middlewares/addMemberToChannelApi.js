import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, addToChannel, payload, ...rest } = action;
  if (!addToChannel) return next(action);

  let token = localStorage.getItem("jwt_token");

  axios({
    method: "PUT",
    url: addToChannel,
    data: {
      specialist_id: payload
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
