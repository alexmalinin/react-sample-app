import { SUCCESS, FAIL, REMOVE_MEMBER_FROM_CHANNEL } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case REMOVE_MEMBER_FROM_CHANNEL + SUCCESS:
            return data;
        default:
            return state;
    }
};