import axios from "axios";
import { SUCCESS } from "../constants/constants";
import { industries } from "../helpers/selects/industries";

export default store => next => action => {
  const { type, getProjectTypes, ...rest } = action;
  if (!getProjectTypes) return next(action);

  const token = localStorage.getItem("jwt_token");

  axios({
    method: "get",
    url: getProjectTypes,

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      let projectTypes = response.data.map(industry => {
        return { value: industry.id, label: industry.name };
      });

      return next({ type: type + SUCCESS, data: projectTypes, ...rest });
    })
    .catch(error => {
      console.log(error);
    });
};
