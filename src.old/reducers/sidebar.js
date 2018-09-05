import { SIDEBAR } from "../actions/types";

export default (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIDEBAR:
      return !state;
    default:
      return state;
  }
};
