import { SUCCESS, FAIL, UPDATE_CHANNEL } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case UPDATE_CHANNEL + SUCCESS:
            return data;
        case UPDATE_CHANNEL + FAIL:
            return data;
        default:
            return state;
    }
};
