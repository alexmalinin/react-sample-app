import {
  SUCCESS,
  FAIL,
  SHOW_ALL_EPICS_WITHOUT_PROJECT
} from "../actions/types";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_ALL_EPICS_WITHOUT_PROJECT + SUCCESS:
      return data;
    default:
      return state;
  }
};
