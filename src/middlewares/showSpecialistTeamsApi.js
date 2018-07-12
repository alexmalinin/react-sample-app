import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showSpecialistTeams, ...rest } = action;
  if (!showSpecialistTeams) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "get",
    url: showSpecialistTeams + user_id + "/teams",

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
