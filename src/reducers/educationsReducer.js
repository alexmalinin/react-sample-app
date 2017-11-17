import { EDUCATION, UPDATE_SPECIALIST_INFO, SUCCESS } from "../constans/constans";
import { isEqual } from 'lodash';

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case EDUCATION:
            return [...state, payload];
        case UPDATE_SPECIALIST_INFO + SUCCESS:
            return [];
        default:
            return state;
    }
};