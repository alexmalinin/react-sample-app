import {
  SIGN_IN,
  SUCCESS,
  FAIL,
  GET_TOKEN_FOR_RESET_PASSWORD,
  GET_PASSWORDS_FOR_RESET_PASSWORD,
  LOG_OUT
} from "../constans/constans";

let result;

export default (state = null, action) => {
  const { type, data, firstLogin = false } = action;
  switch (type) {
    case SIGN_IN:
      result = { data, Loading: true };
      return result;
    case SIGN_IN + SUCCESS:
      result = { data, isLogIn: true };
      return result;
    case SIGN_IN + FAIL:
      result = { data, failSignIn: true };
      return result;
    case LOG_OUT:
      localStorage.clear();
      result = { ...state, isLogIn: false };
      return result;
    case GET_TOKEN_FOR_RESET_PASSWORD:
      return data;
    case GET_PASSWORDS_FOR_RESET_PASSWORD + SUCCESS:
      return data;
    default:
      return state;
  }
};
