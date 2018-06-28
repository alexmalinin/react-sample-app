import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, createCustomTeam, payload, specialistId, ...rest } = action;
  if (!createCustomTeam) return next(action);

  axios({
    method: "post",
    url: createCustomTeam,
    data: {
      team: {
        name: payload["name"],
        specialist_id: specialistId,
        custom_team: true
      }
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
