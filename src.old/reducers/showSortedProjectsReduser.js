import { SHOW_SORTED_PROJECTS, SUCCESS } from "../actions/types";

const initialState = {
  draft: [],
  discovery: [],
  brief_submissions: [],
  reviewed_by_admin: []
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_SORTED_PROJECTS + SUCCESS:
      return data;
    default:
      return state;
  }
};
