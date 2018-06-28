import { SAVE_CREATED_PROJECT, SUCCESS, FAIL } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SAVE_CREATED_PROJECT + SUCCESS:
      return data;
    case SAVE_CREATED_PROJECT + FAIL:
      return data;
    default:
      return state;
  }
};
