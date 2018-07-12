import { SHOW_PROJECT_WITH_ID, SUCCESS, FAIL } from "../actions/types";

const initialState = {
  loading: false,
  loaded: false,
  project: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_PROJECT_WITH_ID:
      return { ...state, loading: true };
    case SHOW_PROJECT_WITH_ID + SUCCESS:
      return { loading: false, loaded: true, project: data, error: null };
    case SHOW_PROJECT_WITH_ID + FAIL:
      return { ...state, loading: false, loaded: true, error: data };
    default:
      return state;
  }
};
