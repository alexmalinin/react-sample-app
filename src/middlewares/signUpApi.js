import axios from 'axios';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, signUp, payload, ...rest } = action;
    if (!signUp) return next(action);

    axios({
        method: 'post',
        url: signUp,
        data: {
            "customer": {
                "first_name": `${payload["first_name"]}`,
                "last_name": `${payload["last_name"]}`,
                "email": `${payload["email"]}`,
                "hear_from": `${payload["hear_from"]["value"]}`,
                "employers_number": `${payload["employers_number"]["value"]}`,
                "phone_number": `${payload["phone-select"]["label"] + payload["phone-input"]}`,
                "company_name": `${payload["company_name"]}`,
                "terms": true
            }
        }
    }).then(function (response) {
        return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function (error) {
        console.log(error);
    });



};
