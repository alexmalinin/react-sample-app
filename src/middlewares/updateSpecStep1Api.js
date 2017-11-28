import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, updateSpecStep1, payload = [], ...rest } = action;
    if (!updateSpecStep1 ) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    let attr = payload.skills_attributes
        ? payload.skills_attributes.map( attr => { return {"name" : attr.label, "id": +attr.value} } )
        : null;
    let spec_attr = payload.speciality_ids
        ? Object.keys(payload.speciality_ids).map(item => +item.match(/\d+/)[0])
        : null;

    axios({
        method: 'put',
        url: updateSpecStep1 + id,
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
        let data = response.data;
        data.successIndustryId = Math.random();
        console.log(type)
        return next({ ...rest, type: type + SUCCESS, data: data });

    })
    .catch(function () {
        let data = {};
        data.errorIndustryId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
