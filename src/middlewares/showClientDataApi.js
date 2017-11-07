import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, showClientData, ...rest } = action;
    if (!showClientData) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    // Client
    axios({
        method: 'get',
        url: showClientData + id
    }).then(function (response) {
        console.log(response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function (error) {
        console.log(error);
    });

    // Specialists

    // } else {
    //     return axios({
    //         method: 'post',
    //         url: signUp,
    //         data: {
    //             "specialist": {
    //                 "first_name": `${payload["first_name"]}`,
    //                 "last_name": `${payload["last_name"]}`,
    //                 "phone_number": `${payload["phone-select"]["label"] + payload["phone-input"]}`,
    //                 "email": `${payload["email"]}`,
    //                 "hear_from": `${payload["hear_from"]["value"]}`,
    //                 "terms": true
    //             }
    //         }
    //
    //     }).then(function (response) {
    //         return next({ ...rest, type: type + SUCCESS, data: response.data });
    //     }).then(function (response) {
    //         localStorage.setItem('user_email', `${response.data.email}`);
    //         return true
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

};
