import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, showChosenSkills, ...rest } = action;
    if (!showChosenSkills) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'get',
        url: showChosenSkills + id
    }).then(function (response) {
        let { industry_title, skills, specialities} = response.data;
        return next({ ...rest, type: type + SUCCESS, data: {industry_title, skills, specialities} });
    })
    .catch(function (error) {
        console.log(error);
    });

};
