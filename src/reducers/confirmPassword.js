import { CONFIRM_PASSWORDS, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case CONFIRM_PASSWORDS + SUCCESS:
            return data;
        default:
            return state;
    }
};