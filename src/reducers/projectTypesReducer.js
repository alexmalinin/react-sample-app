import { GET_PROJECT_TYPES, SUCCESS } from "../constans/constans";

export default (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case GET_PROJECT_TYPES + SUCCESS:
      return data;
    default:
      return state;
  }
};
