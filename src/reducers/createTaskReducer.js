import { SUCCESS, FAIL, CREATE_EPIC_TASK } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case CREATE_EPIC_TASK + SUCCESS:
            return data;
        case CREATE_EPIC_TASK + FAIL:
            return data;
        default:
            return state;
    }
};
