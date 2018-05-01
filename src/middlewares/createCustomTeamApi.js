import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, createCustomTeam, payload, ...rest } = action;
    if (!createCustomTeam) return next(action);
    
    axios({
        method: 'post',
        url: createCustomTeam,
        data: {
          "team": {
              "name": payload["name"]
          }
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
