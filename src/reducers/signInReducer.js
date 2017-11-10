import { SIGN_IN, SUCCESS, FAIL } from '../constans/constans';

let result;

export default (state = null, action) => {
    const { type, data, firstLogin = false } = action;
    switch (type) {
        // case SIGN_IN:
            // result = {data, isLogIn: true, firstLogin: true};
            // return result;
        case SIGN_IN + SUCCESS:
            result = {data, isLogIn: true };
            return result;
        case SIGN_IN + FAIL:
            result = { data, failSignIn: true };
            console.log('fail');
            return result
        default:
            return state;
    }
};