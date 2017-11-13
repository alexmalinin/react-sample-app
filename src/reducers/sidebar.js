import { SIDEBAR } from "../constans/constans";

export default (state = false, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIDEBAR:
            return !state;
        default:
            return state;
    }
};