import { GET_USER_ID, SUCCESS } from "../actions/types";

export default (state = null, action) => {
  const { type, id } = action;
  switch (type) {
    case GET_USER_ID + SUCCESS:
      return id;
    default:
      return state;
  }
};
