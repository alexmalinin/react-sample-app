import { SUCCESS, FAIL, DELETE_PROJECT_EPIC } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case DELETE_PROJECT_EPIC + SUCCESS:
      return data;
    default:
      return state;
  }
};
