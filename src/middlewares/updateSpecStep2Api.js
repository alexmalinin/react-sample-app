import axios from 'axios';
import { SUCCESS } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, updateSpecStep2, payload = [], ...rest } = action;
    if (!updateSpecStep2) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    console.log('-----for attr', payload);

    let attr = payload.skills_attributes.map( attr => { return {"name" : attr.label} } );
    let spec_attr = Object.keys(payload.speciality_ids.map( id => Object.keys(id))).map( string => +string);

    console.log('id', id);
    // console.log( 'data',
    //     { data: {
    //         "specialist": {
    //             "industry": {
    //                 "name": payload["industry"]["label"],
    //                 "id": payload["industry"]["value"],
    //
    //             },
    //             "industry_title": payload["industry_title"],
    //             "address_attributes": {
    //                 "city": payload["city"],
    //                 "country": payload["country"],
    //                 "user_id": id
    //             },
    //             "specialist_skills_attributes": {
    //                 "skill_attributes" : attr
    //             },
    //
    //             "speciality_ids": spec_attr
    //         }
    //     }
    //
    // });

    axios({
        method: 'put',
        url: updateSpecStep2 + id,
        data: {
            "specialist": {
                "industry": {
                    "name"                      : payload["industry"]["label"],
                    "id"                        : payload["industry"]["value"],
                },
                "industry_title"                : payload["industry_title"],
                "address_attributes"            : {
                    "city"                  : payload["city"],
                    "country"               : payload["country"],
                    "user_id"               : id
                },
                "specialist_skills_attributes"  : {
                    "skill_attributes"      : attr
                },
                "speciality_ids"            : spec_attr
            }

        },

        headers: {
            'Authorization': `Bearer ${token}`,
        },

    }).then(function (response) {
        console.log(response);
        return next({ ...rest, type: type + SUCCESS, data: response.data });

    })
    .catch(function (error) {
        console.log(error);
    });
};
