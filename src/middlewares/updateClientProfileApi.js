import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
  const { type, updateClientProfile1, updateClientProfile2, payload, ...rest } = action;
  if (!updateClientProfile2) return next(action);

  let token = localStorage.getItem('jwt_token');
  let { id } = jwtDecode(token);

  window.payload = payload;
  let image = payload["person"] ? payload["person"][0] : null;

  if (image) {
    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      axios({
        method: 'put',
        url: updateClientProfile1 + id + updateClientProfile2,
        data: {
          "profile": {
            "avatar"       : reader.result,
            "first_name"   : payload['first_name'],
            "last_name"    : payload['last_name'],
            "phone_code"   : payload['phone_code']['label'],
            "phone_number" : payload['phone_number'],
            "email"        : payload['email'],
            "description"  : payload['description'],
            "address_attributes"            : {
              "city"                        : payload["city"],
              "country"                     : payload["country"],
              "user_id"                     : id
            }
          }

        }
      }).then(function (response) {
        let data = response.data;
        data.successProfileId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
      })
        .catch(function () {
          let data = {};
          data.errorProfileId = Math.random();
          return next({ ...rest, type: type + FAIL, data: data });
        });
    }
  } else {
    axios({
      method: 'put',
      url: updateClientProfile1 + id + updateClientProfile2,
      data: {
        "profile": {
          "first_name"   : payload['first_name'],
          "last_name"    : payload['last_name'],
          "phone_code"   : payload['phone_code']['label'],
          "phone_number" : payload['phone_number'],
          "email"        : payload['email'],
          "description"  : payload['description'],
          "address_attributes"            : {
            "city"                        : payload["city"],
            "country"                     : payload["country"],
            "user_id"                     : id
          }
        }

      }
    }).then(function (response) {
      let data = response.data;
      data.successProfileId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
      .catch(function () {
        let data = {};
        data.errorProfileId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
      });
  }

};
