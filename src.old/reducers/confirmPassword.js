import {
  CONFIRM_PASSWORDS,
  CHANGE_PASSWORD,
  SUCCESS,
  FAIL
} from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;
  switch (type) {
    case CONFIRM_PASSWORDS + SUCCESS:
      return data;
    case CHANGE_PASSWORD + SUCCESS:
      return data;
    case CHANGE_PASSWORD + FAIL:
      return data;
    default:
      return state;
  }
};
