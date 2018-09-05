import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, showChosenSkills, ...rest } = action;
  if (!showChosenSkills) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "get",
    url: showChosenSkills + user_id,

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let { industry_title, skills, specialities } = response.data;
      return next({
        ...rest,
        type: type + SUCCESS,
        data: { industry_title, skills, specialities }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};
