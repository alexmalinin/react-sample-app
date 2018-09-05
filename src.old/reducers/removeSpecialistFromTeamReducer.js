import { SUCCESS, FAIL, REMOVE_SPECIALIST_FROM_TEAM } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case REMOVE_SPECIALIST_FROM_TEAM + SUCCESS:
      return data;
    default:
      return state;
  }
};
