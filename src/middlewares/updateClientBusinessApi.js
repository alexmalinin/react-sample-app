import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
    const { type, updateClientBusiness, payload, ...rest } = action;
    if (!updateClientBusiness) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'put',
        url: updateClientBusiness + id,
        data: {
            "customer": {
                "industry": payload['industry'],
                "we_are": payload['we_are']['value'],
                "address_attributes": {
                    "city"    : payload['city'],
                    "country" : payload['country'],
                    "user_id" : id
                },
                "description" :  payload['description']
            }
        }
    }).then(function (response) {
        console.log(response);
        let data = response.data;
        data.successBusinessId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.successBusinessId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
