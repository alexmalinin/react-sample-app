import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, showProjectTeam, ...rest } = action;
    if (!showProjectTeam) return next(action);

    axios({
        method: 'get',
        url: showProjectTeam,
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
