import { SUCCESS, FAIL, SHOW_PROJECT_EPIC } from "../actions/types";

const initialState = {
  loading: false,
  loaded: false,
  epic: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_PROJECT_EPIC:
      return { ...state, loading: true, loaded: false };
    case SHOW_PROJECT_EPIC + SUCCESS:
      return { ...state, epic: data, loading: false, loaded: true };
    case SHOW_PROJECT_EPIC + FAIL:
      return { ...state, loading: false, loaded: true, error: data };
    default:
      return state;
  }
};
