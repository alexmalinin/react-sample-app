import { SUCCESS, FAIL, SHOW_ALL_TEAMS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case SHOW_ALL_TEAMS + SUCCESS:
            return data;
        default:
            return state;
    }
};