import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showAllEpics, projectId, ...rest } = action;
  if (!showAllEpics) return next(action);

  next({ ...rest, type });

  let token = localStorage.getItem("jwt_token");

  axios({
    method: "get",
    url: showAllEpics
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      data.projectId = +projectId;
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
