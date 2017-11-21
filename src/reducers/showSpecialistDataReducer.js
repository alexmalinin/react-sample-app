import {
    SUCCESS,
    SHOW_SPECIALIST_DATA,
    UPDATE_SPECIALIST_PROFILE,
    UPDATE_SPECIALIST_AVAILABILITY,
    UPDATE_SPECIALIST_INFO,
    DELETE_EDUCATION_CARD_WITH_ID,
    DELETE_EXPERIENCE_CARD_WITH_ID,
} from '../constans/constans';

export default (state = null, action) => {
    const { type, data, successId } = action;
    switch (type) {
        case SHOW_SPECIALIST_DATA + SUCCESS:
            return data;
        case UPDATE_SPECIALIST_PROFILE + SUCCESS:
            return [state, ...data];
        case UPDATE_SPECIALIST_AVAILABILITY + SUCCESS:
            return data;
        case UPDATE_SPECIALIST_INFO + SUCCESS:
            return data;
        case DELETE_EDUCATION_CARD_WITH_ID + SUCCESS:
            return data;
        case DELETE_EXPERIENCE_CARD_WITH_ID + SUCCESS:
            return data;
        default:
            return state;
    }
};