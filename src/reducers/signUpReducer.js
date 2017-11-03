import { SIGN_UP_STEP_1, SUCCESS, VERIFICATION, WELCOME_CLIENT, UPDATE_SPECIALIST_STEP_2 } from '../constans/constans';

let result;

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SIGN_UP_STEP_1 + SUCCESS:
            return data;
        case VERIFICATION + SUCCESS:
            return data;
        case WELCOME_CLIENT + SUCCESS:
            result = {data, welcomeClient: true};
            return result;
        case UPDATE_SPECIALIST_STEP_2 + SUCCESS:
            let result = {data, welcomeSpecStep1: true};
            return result;
        default:
            return state;
    }
};