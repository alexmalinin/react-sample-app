import axios from "axios";
import { SUCCESS } from "../constants/constants";
import { renameObjPropNames } from "../helpers/functions";

export default store => next => action => {
  const { type, getSkills, ...rest } = action;
  if (!getSkills) return next(action);

  axios({
    method: "get",
    url: getSkills
  })
    .then(response => {
      let data = response.data;
      data.forEach(skill => {
        renameObjPropNames(skill, "id", "value");
        renameObjPropNames(skill, "name", "label");
      });
      data.sort((a, b) => {
        if (a.label < b.label) return -1;
        else if (a.label > b.label) return 1;
        else return 0;
      });
      data.successId = Math.random();

      return next({ type: type + SUCCESS, data, ...rest });
    })
    .catch(error => {
      console.log(error);
    });
};
