import { SUCCESS, SHOW_ALL_CLIENTS } from "../actions/types";

export default (state = [], action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_ALL_CLIENTS + SUCCESS:
      return data;
    default:
      return state;
  }
};
