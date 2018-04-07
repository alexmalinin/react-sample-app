import { SAVE_CREATED_PROJECT, SUCCESS, FAIL, SHOW_ALL_PROJECTS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case SAVE_CREATED_PROJECT + SUCCESS:
            return data;
        case SAVE_CREATED_PROJECT + FAIL:
            return data;
        default:
            return state;
    }
};
