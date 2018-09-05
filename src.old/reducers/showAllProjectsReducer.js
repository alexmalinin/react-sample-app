import { SUCCESS, FAIL, SHOW_ALL_PROJECTS } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_ALL_PROJECTS + SUCCESS:
      return data;
    default:
      return state;
  }
};
