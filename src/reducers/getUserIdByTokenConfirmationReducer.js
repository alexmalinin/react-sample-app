import { GET_USER_ID, SUCCESS } from "../constans/constans";

export default (state = null, action) => {
  const { type, id } = action;
  switch (type) {
    case GET_USER_ID + SUCCESS:
      return id;
    default:
      return state;
  }
};
