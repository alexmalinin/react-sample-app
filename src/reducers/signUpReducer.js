import { SIGN_UP_STEP_1, SUCCESS, VERIFICATION } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SIGN_UP_STEP_1 + SUCCESS:
            return data;
        case VERIFICATION + SUCCESS:
            return data;
        default:
            return state;
    }
};