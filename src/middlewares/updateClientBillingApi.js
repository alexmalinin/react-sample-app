import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, updateClientBilling, payload, ...rest } = action;
    if (!updateClientBilling) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);
    // debugger
    axios({
        method: 'put',
        url: updateClientBilling + id,
        data: {
            "customer": {
                "customer_billing_attributes": {
                    "billing_type":             payload["billing_type"],
                    "account_number":           payload["account_number"],
                    "password":                 payload["password"],
                    "card_name":                payload["card_name"],
                    "card_number":              payload["card_number"],
                    "expiry_date":              payload["expiry_date"],
                    "ccv":                      payload["ccv"],
                    "account_details":          payload["account_details"]
                },
            }
        },

        headers: {
          'Authorization': `Bearer ${token}`,
        }

    }).then(function (response) {
        console.log(response);
        let data = response.data;
        data.successBillingId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.successBillingId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
