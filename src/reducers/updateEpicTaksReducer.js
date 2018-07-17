import { SUCCESS, FAIL, UPDATE_EPIC_TASK } from "../actions/types";
export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case UPDATE_EPIC_TASK + SUCCESS:
      return data;
    case UPDATE_EPIC_TASK + FAIL:
      return data;
    default:
      return state;
  }
};
