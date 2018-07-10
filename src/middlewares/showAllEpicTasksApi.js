import axios from "axios";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showAllEpicTasks, ...rest } = action;
  if (!showAllEpicTasks) return next(action);

  const token = localStorage.getItem("jwt_token");

  axios({
    method: "get",
    url: showAllEpicTasks,

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
