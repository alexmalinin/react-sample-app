import axios from 'axios';
import { SUCCESS } from '../constans/constans';
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
                        "avatar" : reader.result,
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
            .catch(function (error) {
                console.log(error);
            });
        };
    }
};