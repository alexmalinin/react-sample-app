import { SUCCESS, FAIL, SHOW_PROJECT_EPIC } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_PROJECT_EPIC + SUCCESS:
      return data;
    default:
      return state;
  }
};
