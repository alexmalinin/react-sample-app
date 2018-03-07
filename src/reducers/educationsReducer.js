import { isEqual } from 'lodash';
import {
    EDUCATION,
    CLEAR_EDUCATION,
    EDIT_EDUCATION_CARD_WITHOUT_ID,
    DELETE_EDUCATION_CARD_WITHOUT_ID,
    SUCCESS
} from "../constans/constans";


export default (state = [], action) => {
    const { type, payload, id } = action;
    switch (type) {
        case EDUCATION:
            return [...state, payload];
        case CLEAR_EDUCATION:
            return [];
        case EDIT_EDUCATION_CARD_WITHOUT_ID:
            console.log('state', state);
            console.log('id', id);
            payload.educationSuccessId = id;
            return state.map(item => {return item.educationSuccessId === id ? payload : item});
        case DELETE_EDUCATION_CARD_WITHOUT_ID:
            return state.filter(item => !isEqual(item, payload));
        default:
            return state;
    }
};