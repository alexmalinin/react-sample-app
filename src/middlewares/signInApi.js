import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
    const { type, signIn, payload, ...rest } = action;
    if (!signIn) return next(action);

    next({ ...rest, type: type, data: payload });

    let firstLogin;
    // Client
    axios({
        method: 'post',
        url: signIn,
        data: {
            "auth": {
                "email": payload["email"],
                "password": payload["password"]
            }
        }

    }).then(function (response) {
        localStorage.setItem('jwt_token', response.data["jwt"]);
        console.log('login', response);
        return next({ ...rest, type: type + SUCCESS, data: response.data, firstLogin : firstLogin });
    })
    .catch(function (error) {
        console.log(error);
        return next({ ...rest, type: type + FAIL, data: null })
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
