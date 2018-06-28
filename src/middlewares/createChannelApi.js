import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, createTeamChannel, payload, ...rest } = action;
  if (!createTeamChannel) return next(action);

  // let token = localStorage.getItem('jwt_token');
  // let { id } = jwtDecode(token);

  axios({
    method: "post",
    url: createTeamChannel,
    data: {
      name: payload["name"]
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
