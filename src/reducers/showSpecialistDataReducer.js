import { SHOW_SPECIALIST_DATA, SUCCESS, UPDATE_SPECIALIST_PROFILE } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SHOW_SPECIALIST_DATA + SUCCESS:
            return data;
        case UPDATE_SPECIALIST_PROFILE + SUCCESS:
            return data;
        default:
            return state;
    }
};