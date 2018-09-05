import { GET_SKILLS, SUCCESS } from "../actions/types";

export default (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case GET_SKILLS + SUCCESS:
      return data;
    default:
      return state;
  }
};
