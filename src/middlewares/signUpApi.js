import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
    const { type, signUp, user, payload, ...rest } = action;
    if (!signUp) return next(action);

    next({ ...rest, type: type, data: payload });

    // Client

    if (user === 'customers') {
        return axios({
            method: 'post',
            url: signUp,
            data: {
                "customer": {
                    "first_name"       : payload["first_name"],
                    "last_name"        : payload["last_name"],
                    "email"            : payload["email"],
                    "hear_from"        : payload["hear_from"]["value"],
                    "employers_number" : payload["employers_number"]["value"],
                    "phone_code"       : payload["phone_code"]["label"],
                    "phone_number"     : payload["phone_number"],
                    "company_name"     : payload["company_name"],
                    "terms"            : true
                }
            }

        }).then(function (response) {
            localStorage.setItem('user_email', response.data.email);
            return next({ ...rest, type: type + SUCCESS, data: response.data });
        })
        .catch(function (error) {
            return next({ ...rest, type: type + FAIL, data: error })
        });

    // Specialists

    } else {
        return axios({
            method: 'post',
            url: signUp,
            data: {
                "specialist": {
                    "email"     : payload["email"],
                    "terms"     : true
                }
            }

        }).then(function (response) {
            // setTimeout( () => { return next({ ...rest, type: type + SUCCESS, data: response.data }) }, 30000)
            localStorage.setItem('user_email', response.data.email);
            return next({ ...rest, type: type + SUCCESS, data: response.data })
        })
        .catch(function (error) {
            return next({ ...rest, type: type + FAIL, data: error });
        });
    }

};
