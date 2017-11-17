import axios from 'axios';
import { SUCCESS } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, deleteCard1, deleteCard2, ...rest } = action;
    if (!deleteCard1) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    axios({
        method: 'delete',
        url: deleteCard1 + id + deleteCard2,
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