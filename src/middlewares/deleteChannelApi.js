import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, deleteTeamChannel, payload, ...rest } = action;
  if (!deleteTeamChannel) return next(action);

  let token = localStorage.getItem("jwt_token");

  axios({
    method: "delete",
    url: deleteTeamChannel,

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successProjectId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successProjectId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
