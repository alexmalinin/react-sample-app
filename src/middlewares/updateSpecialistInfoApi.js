import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, updateSpecialistInfo, payload, education, experience, ...rest } = action;
    if (!updateSpecialistInfo) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    window.payload = payload;
    let image = payload["person"] ? payload["person"][0] : null;

    if (image) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {

            axios({
                method: 'put',
                url: updateSpecialistInfo + id,
                data: {
                    "specialist": {
                        "avatar"                        : reader.result,
                        "professional_experience_info"  : payload["professional_experience_info"],
                        "hourly_rate"                   : payload["hourly_rate"],
                        "daily_rate"                    : payload["daily_rate"],
                        "educations_attributes"         : education,
                        "work_experiences_attributes"   : experience,
                        "project_type_id"               : payload["project_type"]["value"]
                    }

                },

                headers: {
                    'Authorization': `Bearer ${token}`,
                }

            }).then(function (response) {
                let data = response.data;
                data.successInfoId = Math.random();
                return next({ ...rest, type: type + SUCCESS, data: data });

            })
            .catch(function () {
                let data = {};
                data.errorInfoId = Math.random();
                return next({ ...rest, type: type + FAIL, data: data });
            });
        }
    } else {
        axios({
            method: 'put',
            url: updateSpecialistInfo + id,
            data: {
                "specialist": {
                    "professional_experience_info"  : payload["professional_experience_info"],
                    "hourly_rate"                   : payload["hourly_rate"],
                    "daily_rate"                    : payload["daily_rate"],
                    "educations_attributes"         : education,
                    "work_experiences_attributes"   : experience,
                    "project_type_id"               : payload["project_type"]["value"]
                }

            },

            headers: {
                'Authorization': `Bearer ${token}`,
            }

        }).then(function (response) {
            let data = response.data;
            data.successInfoId = Date.now();
            return next({ ...rest, type: type + SUCCESS, data: data });

        })
        .catch(function () {
            let data = {};
            data.errorInfoId = Math.random();
            return next({ ...rest, type: type + FAIL, data: data });
        });
    }
};