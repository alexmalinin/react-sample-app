import { SHOW_SPECIALIST_DATA, SUCCESS, UPDATE_SPECIALIST_PROFILE, UPDATE_SPECIALIST_AVAILABILITY } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;
    switch (type) {
        case SHOW_SPECIALIST_DATA + SUCCESS:
            console.log('show data')
            console.log(data);
            return data;
        case UPDATE_SPECIALIST_PROFILE + SUCCESS:
            return [state, ...data];
        case UPDATE_SPECIALIST_AVAILABILITY + SUCCESS:
            return [state, ...data];
        default:
            return state;
    }
};