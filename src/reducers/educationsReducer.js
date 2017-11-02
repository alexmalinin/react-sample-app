import { EDUCATION } from "../constans/constans";

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case EDUCATION:
            return [...state, payload];
        default:
            return state;
    }
};