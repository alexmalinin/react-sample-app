import { SHOW_PROJECT_WITH_ID, SUCCESS } from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_PROJECT_WITH_ID + SUCCESS:
      return data;
    default:
      return state;
  }
};
