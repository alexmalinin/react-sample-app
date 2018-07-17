import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, updateClientBilling, payload, ...rest } = action;
  if (!updateClientBilling) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "put",
    url: updateClientBilling + user_id,
    data: {
      customer: {
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
          user_type: "Customer",
          user_id: user_id
        }
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      console.log(response);
      let data = response.data;
      data.successBillingId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successBillingId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
