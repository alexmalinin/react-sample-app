import { SIGN_IN, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data, firstLogin = false } = action;
    switch (type) {
        case SIGN_IN + SUCCESS:
            let result = {data, isLogIn: true, firstLogin};
            return result;
        default:
            return state;
    }
};