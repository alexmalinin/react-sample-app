import {
  SUCCESS,
  FAIL,
  SEARCH_SPECIALIST,
  SEARCH_SPECIALIST_FOR_PROJECT
} from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SEARCH_SPECIALIST + SUCCESS:
      return data;
    case SEARCH_SPECIALIST_FOR_PROJECT + SUCCESS:
      return data;
    case SEARCH_SPECIALIST + FAIL:
      return data;
    case SEARCH_SPECIALIST_FOR_PROJECT + FAIL:
      return data;
    default:
      return state;
  }
};
