import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, showSpecialistData, ...rest } = action;
    if (!showSpecialistData) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'get',
        url: showSpecialistData + id
    }).then(function (response) {
        console.log('type', type + SUCCESS);
        console.log('response');
        return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function (error) {
        console.log(error);
    });
};
