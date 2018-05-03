import { SUCCESS, FAIL, CREATE_CUSTOM_TEAM } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case CREATE_CUSTOM_TEAM + SUCCESS:
            return data;
        case CREATE_CUSTOM_TEAM + FAIL:
            return data;
        default:
            return state;
    }
};
