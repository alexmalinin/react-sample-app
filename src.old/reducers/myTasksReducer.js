import { TOGGLE_MY_TASKS } from "../actions/types";

const initialState = false;

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case TOGGLE_MY_TASKS:
      return !state;
    default:
      return state;
  }
};
