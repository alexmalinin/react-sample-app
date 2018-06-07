import { SUCCESS, SHOW_CUSTOM_TEAMS } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_CUSTOM_TEAMS + SUCCESS:
      return data;
    default:
      return state;
  }
};
