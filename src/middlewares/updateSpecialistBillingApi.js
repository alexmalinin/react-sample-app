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
        billing_attributes: {
          billing_type: payload["billing_type"],
          card_name: payload["card_name"],
          card_number: payload["card_number"],
          expiry_date: payload["expiry_date"],
          ccv: payload["ccv"],
          correspondent_bank: payload["correspondent_bank"],
          beneficiary_bank: payload["beneficiary_bank"],
          beneficiary_name: payload["beneficiary_name"],
          purpose_of_payment: payload["purpose_of_payment"],
          beneficiary_account: payload["beneficiary_account"],
          swift_code: payload["swift_code"],
          iban: payload["iban"],
          user_type: 'Specialist',
          user_id: id,
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
