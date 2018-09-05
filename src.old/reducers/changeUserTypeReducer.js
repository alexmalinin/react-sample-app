import { SPECIALIST } from "../constants/user";

export default (state = SPECIALIST, action) => {
  const { type, user } = action;
  switch (type) {
    case "CHANGE_USER_TYPE":
      return user;
    default:
      return state;
  }
};
