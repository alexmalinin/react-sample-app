import { WORK_EXPERIENCE, UPDATE_SPECIALIST_INFO, DELETE_EXPERIENCE_CARD_WITHOUT_ID, SUCCESS } from "../constans/constans";
import { isEqual } from 'lodash';

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case WORK_EXPERIENCE:
            return [...state, payload];
        case UPDATE_SPECIALIST_INFO + SUCCESS:
            return [];
        case DELETE_EXPERIENCE_CARD_WITHOUT_ID:
            return state.filter(item => !isEqual(item, payload));
        default:
            return state;
    }
};