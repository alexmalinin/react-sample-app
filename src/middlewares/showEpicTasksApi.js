import axios from "axios";
import jwtDecode from "jwt-decode";
import { FAIL, SUCCESS } from "../actions/types";

export default store => next => action => {
  const { type, showEpicTasks, epic, ...rest } = action;
  if (!showEpicTasks) return next(action);

  next({ ...rest, type });

  const token = localStorage.getItem("jwt_token");

  axios({
    method: "get",
    url: showEpicTasks,

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.epicId = epic;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      console.error(error);
      return next({ ...rest, type: type + FAIL, data: error });
    });
};
