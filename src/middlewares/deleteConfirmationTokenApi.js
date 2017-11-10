import axios from 'axios';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, deleteConfirmationToken, ...rest } = action;
    if (!deleteConfirmationToken) return next(action);

    // Client and Specialist
        return axios({
            method: 'get',
            url: deleteConfirmationToken
        }).then(function () {
            console.log('delete Confirmation token');
            return next({ ...rest, type: type + SUCCESS });
        })
        .catch(function (error) {
            console.log(error);
        });
};
