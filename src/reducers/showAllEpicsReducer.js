import { SUCCESS, FAIL, SHOW_ALL_EPICS } from "../actions/types";

const initialState = {
  loading: false,
  loaded: false,
  epics: [],
  error: null
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_ALL_EPICS:
      return { ...state, loading: true };
    case SHOW_ALL_EPICS + SUCCESS:
      return { ...state, epics: data, loading: false, loaded: true };
    case SHOW_ALL_EPICS + FAIL:
      return { ...state, loading: false, loaded: true, error: data };
    default:
      return state;
  }
};
