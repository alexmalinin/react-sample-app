import { SUCCESS, SHOW_CUSTOM_TEAMS } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_CUSTOM_TEAMS + SUCCESS:
      return data;
    default:
      return state;
  }
};
