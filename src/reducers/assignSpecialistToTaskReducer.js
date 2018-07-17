import { SUCCESS, FAIL, ASSIGN_SPECIALIST_TO_TASK } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case ASSIGN_SPECIALIST_TO_TASK + SUCCESS:
      return data;
    default:
      return state;
  }
};
