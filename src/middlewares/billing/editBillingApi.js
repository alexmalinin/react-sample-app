import axios from 'axios';
import { SUCCESS } from '../../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
  const { type, editBilling, payload, ...rest } = action;
  if (!editBilling) return next(action);

  let token = localStorage.getItem('jwt_token');
  let { id } = jwtDecode(token);

  console.log(
    {
      "billing": payload,
    }
  )

  axios({
    method: 'put',
    url: editBilling + id,
    data: {
      "billing": payload,
    },
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