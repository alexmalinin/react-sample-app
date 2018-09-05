import {
  SHOW_SUBMIT_ERROR_MODAL,
  CLOSE_SUBMIT_ERROR_MODAL
} from "../actions/types";

export default (state = null, action) => {
  const { type } = action;

  switch (type) {
    case SHOW_SUBMIT_ERROR_MODAL:
      return true;
    case CLOSE_SUBMIT_ERROR_MODAL:
      return false;
    default:
      return state;
  }
};
