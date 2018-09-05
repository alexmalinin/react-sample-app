import axios from "axios";
import { SUCCESS } from "../constants/constants";

export default store => next => action => {
  const { type, getExperienceLevels, ...rest } = action;
  if (!getExperienceLevels) return next(action);
  let token = localStorage.getItem("jwt_token");
  axios({
    method: "get",
    url: getExperienceLevels,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      let getExperienceLevels = response.data.map(industry => {
        return { value: industry.id, label: industry.name };
      });

      return next({ type: type + SUCCESS, data: getExperienceLevels, ...rest });
    })
    .catch(error => {
      console.log(error);
    });
};
