import { WORK_EXPERIENCE } from "../constans/constans";

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case WORK_EXPERIENCE:
            return [...state, payload];
        default:
            return state;
    }
};