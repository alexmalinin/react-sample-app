import { SUCCESS, SHOW_SPECIALIST_CUSTOM_TEAMS } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_SPECIALIST_CUSTOM_TEAMS + SUCCESS:
      return data;
    default:
      return state;
  }
};
