import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, showAllEpics, project, ...rest } = action;
    if (!showAllEpics) return next(action);

    let token = localStorage.getItem('jwt_token');

    axios({
        method: 'get',
        url: showAllEpics
    })
    .then(function (response) {
        let data = response.data;
        data.successId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function (error) {
        console.log(error);
    });
};
