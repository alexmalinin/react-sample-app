import axios from 'axios';
import { SUCCESS } from '../constans/constans';

export default store => next => action => {
    const { type, welcomeClient, payload, ...rest } = action;
    if (!welcomeClient) return next(action);

    axios({
        method: 'put',
        url: welcomeClient,
        data: {
            "customer": {
                "we_are": `${payload["we_are"]}`,
                "country": `${payload["country"]}`,
                "city": `${payload["city"]}`,
                "industry": `${payload["industry"]}`,
                "description": `${payload["description"]}`,
            }
        }
    }).then(function (response) {
        return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function (error) {
        console.log({"customer": {
            "password": `${payload["password"]}`,
            "password_confirmation": `${payload["password_confirmation"]}`,
        }});
        console.log(error);
    });
};
