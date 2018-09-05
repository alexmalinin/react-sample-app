import { SUCCESS, FAIL, UPDATE_PROJECT } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case UPDATE_PROJECT + SUCCESS:
      return data;
    case UPDATE_PROJECT + FAIL:
      return data;
    default:
      return state;
  }
};
