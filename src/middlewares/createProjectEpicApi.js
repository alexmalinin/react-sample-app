import axios from "axios";
import { SUCCESS, FAIL } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, createProjectEpic, payload, project, ...rest } = action;
  if (!createProjectEpic) return next(action);

  let token = localStorage.getItem("jwt_token");

  let files = payload.file
    ? payload["file"].map(file => {
        return {
          document: file,
          entity_type: "Project"
        };
      })
    : [];

  axios({
    method: "post",
    url: createProjectEpic + project + "/epics",
    data: {
      epic: {
        name: payload["name"],
        project_id: project,
        user_story: payload["user_story"],
        business_requirements: payload["requirements"],
        business_rules: payload["rules"],
        deliverables: payload["criteria"],
        description: payload["description"],
        notes: payload["solution"],
        eta: payload["eta"],
        // "state": payload[""],
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
