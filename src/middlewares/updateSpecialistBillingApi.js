import axios from "axios";
import { SUCCESS } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateSpecialistBillings, payload, ...rest } = action;
  if (!updateSpecialistBillings) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "put",
    url: updateSpecialistBillings + id,
    data: {
      specialist: {
        specialist_billing_attributes: {
          billing_type: payload["billing_type"],
          company_name: payload["company_name"],
          manager: payload["manager"],
          bank_account_details: payload["bank_account_details"],
          swift_code: payload["swift_code"],
          specialist_id: payload["specialist_id"]
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
