import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS, FAIL } from "../constants/constants";
import { renameObjPropNames } from "../helpers/functions";

export default store => next => action => {
  const { type, showProjectWithId, id, ...rest } = action;
  if (!showProjectWithId) return next(action);

  next({ ...rest, type });

  const token = localStorage.getItem("jwt_token");

  axios({
    method: "get",
    url: showProjectWithId + id,

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      let data = response.data;
      data.skills.forEach(skill => {
        renameObjPropNames(skill, "id", "value");
        renameObjPropNames(skill, "name", "label");
      });
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(error => {
      console.error(error);
      return next({ ...rest, type: type + FAIL, data: error });
    });
};
