import { SHOW_CHOSEN_SKILLS, SUCCESS } from '../constans/constans';

export default (state = [], action) => {
    const { type, data } = action;
    switch (type) {
        case SHOW_CHOSEN_SKILLS + SUCCESS:
            return data;
        default:
            return state;
    }
};