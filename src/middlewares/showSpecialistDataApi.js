import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constans/constans";
import { detectSpecType } from "../helpers/functions";

export default store => next => action => {
  const { type, showSpecialistData, ...rest } = action;
  if (!showSpecialistData) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "get",
    url: showSpecialistData + id
  })
    .then(function(response) {
      let data = response.data;
      localStorage.setItem("s_type", data.role);
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
