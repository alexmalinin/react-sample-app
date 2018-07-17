import { SUCCESS, FAIL, CREATE_CHANNEL } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case CREATE_CHANNEL + SUCCESS:
      return data;
    case CREATE_CHANNEL + FAIL:
      return data;
    default:
      return state;
  }
};
