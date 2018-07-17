import { SUCCESS, FAIL, SHOW_SPECIALIST_WITH_ID } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_SPECIALIST_WITH_ID + SUCCESS:
      return data;
    default:
      return state;
  }
};
