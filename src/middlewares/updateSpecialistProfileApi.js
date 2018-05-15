import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS, FAIL } from "../constans/constans";

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
  let { id } = jwtDecode(token);

  window.payload = payload;
  let image = payload["person"] ? payload["person"][0] : null;

  if (image) {
    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      axios({
        method: "put",
        url: updateSpecialistProfile1 + id + updateSpecialistProfile2,
        data: {
          profile: {
            avatar: reader.result,
            first_name: payload["first_name"],
            last_name: payload["last_name"],
            phone_number: payload["phone_number"],
            email: payload["email"],
            professional_experience_info:
              payload["professional_experience_info"],
            educations_attributes: education,
            work_experiences_attributes: experience,
            address_attributes: {
              city: payload["city"],
              country: payload["country"],
              user_id: id
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
      url: updateSpecialistProfile1 + id + updateSpecialistProfile2,
      data: {
        profile: {
          first_name: payload["first_name"],
          last_name: payload["last_name"],
          phone_number: payload["phone_number"],
          email: payload["email"],
          professional_experience_info: payload["professional_experience_info"],
          educations_attributes: education,
          work_experiences_attributes: experience,
          address_attributes: {
            city: payload["city"],
            country: payload["country"],
            user_id: id
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
  }
};
