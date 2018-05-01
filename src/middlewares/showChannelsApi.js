import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, showChannels, team, ...rest } = action;
    if (!showChannels) return next(action);

    // let token = localStorage.getItem('jwt_token');
    // let { id } = jwtDecode(token);

    axios({
        method: 'get',
        url: showChannels,

    }).then(function (response) {
        let data = response.data;
        data.team = team;
        data.successProjectId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.successProjectId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
