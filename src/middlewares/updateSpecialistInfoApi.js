import axios from 'axios';
import { SUCCESS } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, updateSpecialistInfo, payload, education, experience, ...rest } = action;
    if (!updateSpecialistInfo) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    console.log(payload);

    axios({
        method: 'put',
        url: updateSpecialistInfo + id,
        data: {
            "specialist": {
                "avatar"                       : payload["person"],
                "professional_experience_info" : payload["professional_experience_info"],
                "hourly_rate"                  : payload["hourly_rate"],
                "daily_rate"                   : payload["daily_rate"],
                "educations_attributes"        : education,
                "work_experiences_attributes"  : experience,
                "project_type_id"              : payload["project_type"]["value"]
            }

        },

        headers: {
            'Authorization': `Bearer ${token}`,
        }

    }).then(function (response) {
        console.log(response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });

    })
    .catch(function (error) {
        console.log(error);
    });
};