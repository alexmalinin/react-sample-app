import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showAllProjects, ...rest } = action;
  if (!showAllProjects) return next(action);

  const token = localStorage.getItem("jwt_token");
  const { user_id } = jwtDecode(token);

  axios({
    method: "get",
    url: showAllProjects + user_id,

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
