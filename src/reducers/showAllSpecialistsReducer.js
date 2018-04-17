import { SUCCESS, FAIL, SHOW_ALL_SPECIALISTS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case SHOW_ALL_SPECIALISTS + SUCCESS:
            return data;
        default:
            return state;
    }
};