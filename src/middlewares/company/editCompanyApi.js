import axios from "axios";
import { SUCCESS } from "../../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateSpecStep2, company, payload, ...rest } = action;
  if (!updateSpecStep2) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  console.log({
    company: payload
  });
  axios({
    method: "put",
    url: updateSpecStep2 + user_id,
    data: {
      specialist: {
        company_attributes: company
        // "name"                : payload["name"],
        // "company_address"     : payload["company_address"],
        // "country"             : payload["country"],
        // "city"                : payload["city"],
        // "industry_area_id"    : payload["industry"]["value"],
        // "number_of_employers" : payload["number_of_employers"]["value"],
        // "segment"             : payload["segment"]["value"],
        // "website"             : payload["segment"]
      }
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response);
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
