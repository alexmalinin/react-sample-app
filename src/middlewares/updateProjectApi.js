import axios from "axios";
import { SUCCESS, FAIL } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateCreatedProject, payload, epic, ...rest } = action;
  if (!updateCreatedProject) return next(action);

  let token = localStorage.getItem("jwt_token");
  let files = payload.file
    ? payload.file.map(file => {
        return {
          document: file,
          entity_type: "Project"
        };
      })
    : [];

  let skill_ids =
    payload["skills"] &&
    payload["skills"].map(skill => {
      return skill.value;
    });

  window.payload = payload;
  let logo = payload["logo"] ? payload["logo"][0] : undefined;
  let reader = new FileReader();

  if (logo) {
    reader.readAsDataURL(logo);
  }

  axios({
    method: "PUT",
    url: updateCreatedProject,
    data: {
      project: {
        name: payload["name"],
        description: payload["description"],
        user_story: payload["user_story"],
        business_requirements: payload["business_requirements"],
        business_rules: payload["business_rules"],
        deliverables: payload["deliverables"],
        further_notes: payload["further_notes"],
        logo: logo && reader.result,
        attached_files_attributes: files,
        skill_ids
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
