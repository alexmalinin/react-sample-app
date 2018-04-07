import { CREATE_PROJECT_EPIC, SUCCESS, FAIL } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case CREATE_PROJECT_EPIC + SUCCESS:
            return data;
        case CREATE_PROJECT_EPIC + FAIL:
            return data;
        default:
            return state;
    }
};
