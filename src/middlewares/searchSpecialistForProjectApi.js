import axios from "axios";
import { SUCCESS, FAIL } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, searchSpecialistForProject, ...rest } = action;
  if (!searchSpecialistForProject) return next(action);

  let token = localStorage.getItem("jwt_token");

  axios({
    method: "GET",
    url: searchSpecialistForProject,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      // data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
