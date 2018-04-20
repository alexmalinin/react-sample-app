import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, createChannel, payload, ...rest } = action;
    if (!createChannel) return next(action);

    // let token = localStorage.getItem('jwt_token');
    // let { id } = jwtDecode(token);

    axios({
        method: 'post',
        url: createChannel,
        data: {
            "name": payload["name"]
        },

    }).then(function (response) {
        let data = response.data;
        data.successProjectId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.successProjectId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
