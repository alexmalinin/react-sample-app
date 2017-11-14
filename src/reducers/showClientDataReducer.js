import { SHOW_CLIENT_DATA, UPDATE_CLIENT_PROFILE, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SHOW_CLIENT_DATA + SUCCESS:
            return data;
        case UPDATE_CLIENT_PROFILE + SUCCESS:
            return data;
        default:
            return state;
    }
};