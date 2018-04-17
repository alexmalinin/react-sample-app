import axios from 'axios';
import { SUCCESS, FAIL } from '../constans/constans';
import jwtDecode from 'jwt-decode';

export default store => next => action => {
    const { type, saveCreatedProgect, payload, ...rest } = action;
    if (!saveCreatedProgect) return next(action);

    let token = localStorage.getItem('jwt_token');
    let { id } = jwtDecode(token);

    let files = payload.file ? payload.file.split('||').map((file) => {
        return {
            "document": file,
            "entity_type": "Project"
        }
    }) : [];

    axios({
        method: 'post',
        url: saveCreatedProgect,
        data: {
            "project": {
                "name": payload["name"],
                "customer_id": id,
                "description": payload["description"],
                "user_story": payload["user_story"],
                "business_requirements": payload["requirements"],
                "business_rules": payload["rules"],
                "deliverables": payload["criteria"],
                "further_notes": payload["solution"],
                "attached_files_attributes": files
            }
        },

        headers: {
          'Authorization': `Bearer ${token}`,
        }

    }).then(function (response) {
        let data = response.data;
        data.successProjectId = Math.random();
        return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function () {
        let data = {};
        data.successProjectId = Math.random();
        return next({ ...rest, type: type + FAIL, data: data });
    });
};
