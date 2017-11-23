import axios from 'axios';
import { SUCCESS } from '../../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, deleteExperienceCard, ...rest } = action;
    if (!deleteExperienceCard) return next(action);

    let token = localStorage.getItem('jwt_token');

    axios({
        method: 'delete',
        url: deleteExperienceCard,
        headers: {
            'Authorization': `Bearer ${token}`,
        }

    }).then( (response) => {
        console.log(response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });

    })
    .catch(function (error) {
        console.log(error);
    });
};