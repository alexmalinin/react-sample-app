import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
    const { type, updateSpecialistProfile1, updateSpecialistProfile2, payload, ...rest } = action;
    if (!updateSpecialistProfile1) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'put',
        url: updateSpecialistProfile1 + id + updateSpecialistProfile2,
        data: {
            "profile": {
                "first_name"    : payload['first_name'],
                "last_name"     : payload['last_name'],
                "phone_code"    : payload['phone_code']['label'],
                "phone_number"  : payload['phone_number'],
                "email"         : payload['email'],
            }
        }
    }).then(function (response) {
        let data = response.data;
        data.successProfileId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.errorProfileId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
