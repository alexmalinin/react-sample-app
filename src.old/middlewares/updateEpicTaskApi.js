import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateEpicTask, payload, epic, ...rest } = action;
  if (!updateEpicTask) return next(action);

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
    url: updateEpicTask,
    data: {
      task: {
        name: payload["name"],
        description: payload["description"],
        epic_id: epic,
        eta: payload["eta"],
        state: payload["state"],
        cost: payload["cost"],
        user_story: payload["user_story"],
        deliverables: payload["deliverables"],
        business_requirements: payload["business_requirements"],
        business_rules: payload["business_rules"],
        notes: payload["notes"],
        attached_files_attributes: files
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(error => {
      let data = {};
      data.successId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
