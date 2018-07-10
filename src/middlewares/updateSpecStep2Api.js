import axios from "axios";
import { SUCCESS } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateSpecStep2, payload, ...rest } = action;
  if (!updateSpecStep2) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "put",
    url: updateSpecStep2 + user_id,
    data: {
      specialist: {
        company_attributes: {
          name: payload["name"],
          company_address: payload["company_address"],
          country: payload["country"],
          city: payload["city"],
          industry_area_id: payload["industry"]["value"] || payload["industry"],
          number_of_employers:
            payload["number_of_employers"]["value"] ||
            payload["number_of_employers"],
          segment: payload["segment"]["value"] || payload["segment"],
          website: payload["website"]
        }
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successUpdateId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      let data = {};
      data.errorUpdateId = Math.random();
      console.log(error);
    });
};
