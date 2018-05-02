import {
  CREATE_PROJECT_EPIC,
  SUCCESS,
  FAIL,
  UPDATE_PROJECT_EPIC
} from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case UPDATE_PROJECT_EPIC + SUCCESS:
      return data;
    case CREATE_PROJECT_EPIC + SUCCESS:
      return data;
    case CREATE_PROJECT_EPIC + FAIL:
      return data;
    default:
      return state;
  }
};
