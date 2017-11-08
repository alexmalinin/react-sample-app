import { SHOW_SPECIALIST_DATA, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SHOW_SPECIALIST_DATA + SUCCESS:
            return data;
        default:
            return state;
    }
};