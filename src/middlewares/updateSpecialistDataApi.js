import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, updateSpecialistProfile1, updateSpecialistProfile2, payload, ...rest } = action;
    if (!updateSpecialistProfile1) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'put',
        url: updateSpecialistProfile1 + id + updateSpecialistProfile2,
        data: {
            "specialist": {
                "password": payload['password']
            },
            "profile": {
                "first_name": payload['first_name'],
                "last_name": payload['last_name'],
                "phone_code": payload['phone_code'],
                "phone_number": payload['phone_number'],
                "email": payload['email'],
                "address_attributes": {
                    "country": payload["country"],
                    "user_id": id
                }
            }
        }
    }).then(function (response) {
        return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function (error) {
        console.log(error);
    });
};
