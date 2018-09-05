import { SUCCESS, SHOW_CHANNELS } from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_CHANNELS + SUCCESS:
      return data;
    default:
      return state;
  }
};
