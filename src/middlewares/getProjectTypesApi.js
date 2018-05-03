import axios from "axios";
import { SUCCESS } from "../constans/constans";
import { industries } from "../helpers/selects/industries";

export default store => next => action => {
  const { type, getProjectTypes, ...rest } = action;
  if (!getProjectTypes) return next(action);
  axios({
    method: "get",
    url: getProjectTypes
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
