import axios from 'axios';
import { SUCCESS } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, updateSpecStep2, payload, ...rest } = action;
    if (!updateSpecStep2) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'put',
        url: updateSpecStep2 + id,
        data: {
            "specialist": {
                "company_attributes"  : {
                  "name"                : payload["name"],
                  "company_address"     : payload["company_address"],
                  "country"             : payload["country"],
                  "city"                : payload["city"],
                  "industry_area_id"    : payload["industry"]["value"],
                  "number_of_employers" : payload["number_of_employers"]["value"],
                  "segment"             : payload["segment"]["value"],
                  "website"             : payload["website"]
                }
            }

        },

        headers: {
            'Authorization': `Bearer ${token}`,
        }

    }).then(function (response) {
        let data = response.data;
        data.successUpdateId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: response.data });

    })
    .catch(function (error) {
        let data = {};
        data.errorUpdateId = Math.random();
        console.log(error);
    });
};