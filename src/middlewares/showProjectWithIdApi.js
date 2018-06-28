import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constants/constants";
import { renameObjPropNames } from "../helpers/functions";

export default store => next => action => {
  const { type, showProjectWithId, id, ...rest } = action;
  if (!showProjectWithId) return next(action);

  // let token = localStorage.getItem('jwt_token');
  // let { id } = jwtDecode(token);

  axios({
    method: "get",
    url: showProjectWithId + id
  })
    .then(function(response) {
      let data = response.data;
      data.skills.forEach(skill => {
        renameObjPropNames(skill, "id", "value");
        renameObjPropNames(skill, "name", "label");
      });
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
