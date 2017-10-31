import { SIGN_UP_STEP_1, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIGN_UP_STEP_1 + SUCCESS:
            return action;
        default:
            return state;
    }
};