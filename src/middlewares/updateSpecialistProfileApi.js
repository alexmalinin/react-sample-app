import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS, FAIL } from "../constants/constants";

export default store => next => action => {
  const {
    type,
    updateSpecialistProfile1,
    updateSpecialistProfile2,
    payload,
    education,
    experience,
    ...rest
  } = action;
  if (!updateSpecialistProfile1) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  window.payload = payload;
  let image = payload["person"] ? payload["person"][0] : null;

  const educationData = education.map(item => {
    return {
      name: item["name"],
      specialisation: item["specialisation"],
      started_at: item["started_at"]["value"] || item["started_at"],
      finished_at: item["finished_at"]["value"] || item["finished_at"],
      degree: item["degree"],
      description: item["description"]
    };
  });

  const experienceData = experience.map(item => {
    return {
      name: item["name"],
      country: item["country"],
      city: item["city"],
      position: item["position"],
      started_at: item["started_at"]["value"] || item["started_at"],
      finished_at: item["finished_at"]["value"] || item["finished_at"],
      description: item["description"]
    };
  });

  if (image) {
    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      axios({
        method: "put",
        url: updateSpecialistProfile1 + user_id + updateSpecialistProfile2,
        data: {
          profile: {
            avatar: reader.result,
            first_name: payload["first_name"],
            last_name: payload["last_name"],
            phone_number: payload["phone_number"],
            email: payload["email"],
            professional_experience_info:
              payload["professional_experience_info"],
            educations_attributes: educationData,
            work_experiences_attributes: experienceData,
            address_attributes: {
              city: payload["city"],
              country: payload["country"],
              user_id
            }
          }
        }
      })
        .then(function(response) {
          let data = response.data;
          data.successProfileId = Math.random();
          return next({ ...rest, type: type + SUCCESS, data: data });
        })
        .catch(function() {
          let data = {};
          data.errorProfileId = Math.random();
          return next({ ...rest, type: type + FAIL, data: data });
        });
    };
  } else {
    axios({
      method: "put",
      url: updateSpecialistProfile1 + user_id + updateSpecialistProfile2,
      data: {
        profile: {
          first_name: payload["first_name"],
          last_name: payload["last_name"],
          phone_number: payload["phone_number"],
          email: payload["email"],
          professional_experience_info: payload["professional_experience_info"],
          educations_attributes: educationData,
          work_experiences_attributes: experienceData,
          address_attributes: {
            city: payload["city"],
            country: payload["country"],
            user_id
          }
        }
      },

      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function(response) {
        let data = response.data;
        data.successProfileId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
      })
      .catch(function() {
        let data = {};
        data.errorProfileId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
      });
  }
};
