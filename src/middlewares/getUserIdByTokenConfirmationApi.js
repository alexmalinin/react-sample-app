import axios from 'axios';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, userConfirmationToken, user, ...rest } = action;
    if (!userConfirmationToken) return next(action);

    // Client

    if (user === 'customer') {
        return axios({
            method: 'get',
            url: userConfirmationToken
        }).then(function (response) {
            return next({ ...rest, type: type + SUCCESS, id: response.data["id"] });
        })
        .catch(function (error) {
            console.log(error);
        });

    // Specialists

    } else {
        return axios({
            method: 'get',
            url: userConfirmationToken
        }).then(function (response) {
            return next({ ...rest, type: type + SUCCESS, id: response.data["id"] });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

};
