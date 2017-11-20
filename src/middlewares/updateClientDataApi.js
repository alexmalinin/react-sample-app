import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, updateClientProfile1, updateClientProfile2, payload, ...rest } = action;
    if (!updateClientProfile2) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'put',
        url: updateClientProfile1 + id + updateClientProfile2,
        data: {
            "customer": {
                "password": payload['password']
            },
            "profile": {
                "first_name": payload['first_name'],
                "last_name": payload['last_name'],
                "phone_code": payload['phone_code']['label'],
                "phone_number": payload['phone_number'],
                "email": payload['email'],
            }
        }
    }).then(function (response) {
        return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function (error) {
        console.log(error);
    });
};
