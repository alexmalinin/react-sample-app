import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateClientCompany, payload, ...rest } = action;
  if (!updateClientCompany) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "put",
    url: updateClientCompany + id,
    data: {
      customer: {
        company_attributes: {
          name: payload["name"],
          registered_name: payload["registered_name"],
          company_address: payload["company_address"],
          website: payload["website"],
          country: payload["country"],
          city: payload["city"],
          abn_acn: payload["abn_acn"],
          tell_about: payload["tell_about"],
          segment: payload["segment"]["value"] || payload["segment"],
          number_of_employers:
            payload["number_of_employers"]["value"] ||
            payload["number_of_employers"],
          user_id: id,
          industry_area_id: payload["industry"]["value"] || payload["industry"]
        }
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successCompanyId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.errorCompanyId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
