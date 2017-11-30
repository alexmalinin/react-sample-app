import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
    const { type, updateSpecialistAvailability1, updateSpecialistAvailability2, payload, ...rest } = action;
    if (!updateSpecialistAvailability1) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'put',
        url: updateSpecialistAvailability1 + id + updateSpecialistAvailability2,
        data: {
            "availability": {
                "available"      : payload["availability"],
                "available_days" : payload["days"],
                "hours_per_week" : payload["hours_per_week"],
            }
        }
    }).then(function (response) {
        let data = response.data;
        data.successAvailabilityId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.errorAvailabilityId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
