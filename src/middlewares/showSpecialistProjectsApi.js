import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showSpecialistProjects, ...rest } = action;
  if (!showSpecialistProjects) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "get",
    url: showSpecialistProjects + user_id + "/projects",

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
