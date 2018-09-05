import { HIDE_FOOTER } from "../actions/types";

export default (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case HIDE_FOOTER:
      return true;
    default:
      return false;
  }
};
