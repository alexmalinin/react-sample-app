import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SUCCESS, FAIL } from '../constans/constans';

export default store => next => action => {
    const { type, updateClientCompany, payload, ...rest } = action;
    if (!updateClientCompany) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);
    debugger
    axios({
        method: 'put',
        url: updateClientCompany + id,
        data: {
            "customer": {
                "name"            : payload['name'],
                "company_address" : payload['company_address'],
                "website"         : payload['website'],
                "country"         : payload['country'],
                "city"            : payload['city'],
                "tell_about"      : payload['tell_about'],
                "registered_name" : payload['registered_name'],
                "segment"         : payload['segment']['value']
            }
        }
    }).then(function (response) {
        console.log(response);
        let data = response.data;
        data.successCompanyId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.successCompanyId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
