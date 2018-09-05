import { GET_EXPERIENCE_LEVELS, SUCCESS } from "../actions/types";

export default (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case GET_EXPERIENCE_LEVELS + SUCCESS:
      return data;
    default:
      return state;
  }
};
