import axios from 'axios';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
  const { type, getExperienceLevels, ...rest } = action;
  if (!getExperienceLevels) return next(action);
  axios({
    method: 'get',
    url: getExperienceLevels
  }).then( response => {
    let getExperienceLevels = response.data.map( industry => {
      return { "value" : industry.id, "label" : industry.name }
    });

    return next({ type: type + SUCCESS, data: getExperienceLevels, ...rest });
  })
    .catch( error => {
      console.log(error);
    });
};
