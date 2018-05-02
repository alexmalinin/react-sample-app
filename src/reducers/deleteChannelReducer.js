import { SUCCESS, FAIL, DELETE_CHANNEL } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case DELETE_CHANNEL + SUCCESS:
      return data;
    case DELETE_CHANNEL + FAIL:
      return data;
    default:
      return state;
  }
};
