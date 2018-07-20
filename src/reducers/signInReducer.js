import {
  SIGN_IN,
  SUCCESS,
  FAIL,
  GET_TOKEN_FOR_RESET_PASSWORD,
  GET_PASSWORDS_FOR_RESET_PASSWORD,
  LOG_OUT
} from "../actions/types";

const getInitialState = () => ({
  data: {
    access_token: localStorage.getItem("jwt_token")
  }
});

export default (state = getInitialState(), action) => {
  const { type, data } = action;
  switch (type) {
    case SIGN_IN:
      return { data, Loading: true };
    case SIGN_IN + SUCCESS:
      return { data, isLogIn: true };
    case SIGN_IN + FAIL:
      return { data, failSignIn: true };
    case LOG_OUT:
      return { ...state, isLogIn: false };
    case GET_TOKEN_FOR_RESET_PASSWORD + SUCCESS:
      return { data, resetPassword: true };
    case GET_TOKEN_FOR_RESET_PASSWORD + FAIL:
      return { data, failResetPassword: true };
    case GET_PASSWORDS_FOR_RESET_PASSWORD + SUCCESS:
      return data;
    default:
      return state;
  }
};
