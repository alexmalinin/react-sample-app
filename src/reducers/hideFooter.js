import { HIDE_FOOTER } from "../constans/constans";

export default (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case HIDE_FOOTER:
      return true;
    default:
      return false;
  }
};
