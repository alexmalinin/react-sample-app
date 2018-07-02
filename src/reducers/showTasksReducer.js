import { SUCCESS, FAIL, SHOW_EPIC_TASKS } from "../actions/types";

const initialState = {
  loading: false,
  loaded: false,
  tasks: [],
  error: null
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_EPIC_TASKS:
      return { ...state, loading: true, loaded: false };
    case SHOW_EPIC_TASKS + SUCCESS:
      return { ...state, tasks: data, loading: false, loaded: true };
    case SHOW_EPIC_TASKS + FAIL:
      return { ...state, loading: false, loaded: true, error: data };
    default:
      return state;
  }
};
