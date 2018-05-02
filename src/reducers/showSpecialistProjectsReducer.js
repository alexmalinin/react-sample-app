import { SHOW_SPECIALIST_PROJECTS, SUCCESS } from '../constans/constans';

export default (state = null, action) => {
    const { type, data } = action;

    switch (type) {
        case SHOW_SPECIALIST_PROJECTS + SUCCESS:
            return data;
        default:
            return state;
    }
};
