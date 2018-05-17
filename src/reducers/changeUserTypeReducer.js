import { getUserType } from "../helpers/functions";

export default (state = getUserType(), action) => {
  const { type, user } = action;
  switch (type) {
    case "CHANGE_USER_TYPE":
      return user;
    default:
      return state;
  }
};
