import { SIGN_UP_STEP_1, SUCCESS, VERIFICATION, WELCOME_CLIENT } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SIGN_UP_STEP_1 + SUCCESS:
            return data;
        case VERIFICATION + SUCCESS:
            return data;
        case WELCOME_CLIENT + SUCCESS:
            let result = {data, welcomeClient: true};
            return result;
        default:
            return state;
    }
};