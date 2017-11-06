import axios from 'axios';
import { SUCCESS } from '../constans/constans';
import jwtDecode from 'jwt-decode';
let token = localStorage.getItem('jwt_token');
let { id } = jwtDecode(token);

export default store => next => action => {
    const { type, updateSpecStep3, payload, education, experience, ...rest } = action;
    if (!updateSpecStep3) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    // let attr = payload.skills_attributes.map( attr => { return {"name" : attr.label} } );
    // let spec_attr = Object.keys(payload.speciality_ids.map( id => Object.keys(id))).map( string => +string);


    console.log('data',
        {
            data: {
                "specialist": {
                    "avatar": payload["person"],
                    "professional_experience_info": payload["professional_experience_info"],
                    "hourly_rate": payload["hourly-rate"],
                    "daily_rate": payload["daily-rate"],
                    "available": payload["availability"],
                    "available_days": payload["days"],
                    "hours_per_week": payload["work-hourses"]["label"],
                    "educations_attributes": education,
                    "work_experiences_attributes": experience
                }
            }

        });

    axios({
        method: 'put',
        url: updateSpecStep3 + id,
        data: {
            "specialist": {
                "avatar"                       : payload["person"],
                "professional_experience_info" : payload["professional_experience_info"],
                "hourly_rate"                  : payload["hourly-rate"],
                "daily_rate"                   : payload["daily-rate"],
                "available"                    : payload["availability"],
                "available_days"               : payload["days"],
                "hours_per_week"               : payload["work-hourses"]["label"],
                "educations_attributes"        : education,
                "work_experiences_attributes"  : experience
            }

        },

        headers: {
            'Authorization': `Bearer ${token}`,
        }

    }).then(function (response) {
        console.log(response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });

    })
    .catch(function (error) {
        // console.log(
        //     {
        //         data: {
        //             "specialist": {
        //                 "industry": {
        //                     "name": `${payload["industry"]["label"]}`,
        //                     "id": `${payload["industry"]["value"]}`
        //                 },
        //                 "industry_title": `${payload["industry_title"]}`,
        //                 "address_attributes": {
        //                     "city": `${payload["city"]}`,
        //                     "country": `${payload["country"]}`
        //                 },
        //                 "skills_attributes": attr,
        //                 "speciality_ids": spec_attr
        //             }
        //
        //         }
        //     }
        //
        // );
        console.log(error);
    });
};