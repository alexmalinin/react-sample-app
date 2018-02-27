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
                    "email"            : payload["email"],
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
