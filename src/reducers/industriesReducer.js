import { GET_INDUSTRIES, SUCCESS } from "../constans/constans";

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_INDUSTRIES + SUCCESS:
            return payload;
        default:
            return state;
    }
};