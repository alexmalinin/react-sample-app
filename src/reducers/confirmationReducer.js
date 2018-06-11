import {
  SHOW_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL
} from "../constans/constans";

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_CONFIRMATION_MODAL:
      return payload;
    case CLOSE_CONFIRMATION_MODAL:
      return null;
    default:
      return state;
  }
};
