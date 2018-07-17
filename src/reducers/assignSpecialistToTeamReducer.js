import { SUCCESS, FAIL, ASSIGN_SPECIALIST_TO_TEAM } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case ASSIGN_SPECIALIST_TO_TEAM + SUCCESS:
      return data;
    default:
      return state;
  }
};
