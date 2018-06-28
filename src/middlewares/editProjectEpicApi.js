import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateProjectEpic, payload, ...rest } = action;
  if (!updateProjectEpic) return next(action);

  let token = localStorage.getItem("jwt_token");

  let files = payload.file
    ? payload.file.split("||").map(file => {
        return {
          document: file,
          entity_type: "Project"
        };
      })
    : [];

  axios({
    method: "PUT",
    url: updateProjectEpic,
    data: {
      epic: {
        name: payload["name"],
        user_story: payload["user_story"],
        business_requirements: payload["requirements"],
        business_rules: payload["rules"],
        deliverables: payload["criteria"],
        description: payload["description"],
        notes: payload["solution"],
        eta: payload["eta"],
        attached_files_attributes: files
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successEpicId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successEpicId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
