import { SUCCESS, FAIL, ADD_MEMBER_TO_CHANNEL } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case ADD_MEMBER_TO_CHANNEL + SUCCESS:
      return data;
    default:
      return state;
  }
};
