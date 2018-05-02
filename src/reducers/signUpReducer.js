import {
  SIGN_UP_STEP_1,
  RESET_SIGN_UP,
  VERIFICATION,
  WELCOME_CLIENT,
  UPDATE_SPECIALIST_STEP_1,
  UPDATE_SPECIALIST_STEP_2,
  SUCCESS,
  FAIL
} from "../constans/constans";

let result;

export default (state = null, action) => {
  const { type, data } = action;
  switch (type) {
    case SIGN_UP_STEP_1:
      result = { data, Loading: true, failLogin: true };
      return result;
    case SIGN_UP_STEP_1 + SUCCESS:
      result = { data, isLogIn: true };
      return data;
    case SIGN_UP_STEP_1 + FAIL:
      result = { data, failLogin: true };
      return result;
    case RESET_SIGN_UP:
      return null;
    case VERIFICATION + SUCCESS:
      return data;
    case WELCOME_CLIENT + SUCCESS:
      result = { data, welcomeClient: true };
      return result;
    case UPDATE_SPECIALIST_STEP_1 + SUCCESS:
      result = { data, welcomeSpecStep1: true };
      return result;
    case UPDATE_SPECIALIST_STEP_2 + SUCCESS:
      result = { data, welcomeSpecStep2: true };
      return result;
    default:
      return state;
  }
};
