import { isEqual } from 'lodash';
import {
    EDUCATION,
    UPDATE_SPECIALIST_INFO,
    DELETE_EDUCATION_CARD_WITHOUT_ID,
    SUCCESS
} from "../constans/constans";


export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case EDUCATION:
            return [...state, payload];
        case UPDATE_SPECIALIST_INFO + SUCCESS:
            return [];
        case DELETE_EDUCATION_CARD_WITHOUT_ID:
            return state.filter(item => !isEqual(item, payload));
        default:
            return state;
    }
};