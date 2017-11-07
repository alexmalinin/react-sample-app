import { SHOW_CLIENT_DATA, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SHOW_CLIENT_DATA + SUCCESS:
            return data;
        default:
            return state;
    }
};