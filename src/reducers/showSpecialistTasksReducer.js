import { SUCCESS, SHOW_SPECIALIST_TASKS } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_SPECIALIST_TASKS + SUCCESS:
      return data;
    default:
      return state;
  }
};
