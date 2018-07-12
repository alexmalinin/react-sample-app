import axios from "axios";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showCustomTeams, ...rest } = action;
  if (!showCustomTeams) return next(action);

  const token = localStorage.getItem("jwt_token");

  axios({
    method: "get",
    url: showCustomTeams,

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
