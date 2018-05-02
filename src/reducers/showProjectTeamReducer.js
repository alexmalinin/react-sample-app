import { SUCCESS, SHOW_PROJECT_TEAM } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_PROJECT_TEAM + SUCCESS:
      return data;
    default:
      return state;
  }
};
