import { SUCCESS, FAIL, SHOW_ALL_EPIC_TASKS } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_ALL_EPIC_TASKS + SUCCESS:
      return data;
    default:
      return state;
  }
};
