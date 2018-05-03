import {
  SUCCESS,
  FAIL,
  SHOW_SPECIALIST_DATA,
  UPDATE_SPECIALIST_PROFILE,
  UPDATE_SPECIALIST_STEP_1, // like UPDATE_SPECIALIST_INDUSTRY
  UPDATE_SPECIALIST_STEP_2, // like UPDATE_SPECIALIST_INDUSTRY
  EDIT_EDUCATION_CARD_WITH_ID,
  DELETE_EDUCATION_CARD_WITH_ID,
  DELETE_EXPERIENCE_CARD_WITH_ID,
  UPDATE_SPECIALIST_BILLINGS,
  EDIT_EXPERIENCE_CARD_WITH_ID
} from "../constans/constans";

export default (state = null, action) => {
  const { type, data } = action;

  switch (type) {
    case SHOW_SPECIALIST_DATA + SUCCESS:
      return data;
    case UPDATE_SPECIALIST_PROFILE + SUCCESS:
      return data;
    case UPDATE_SPECIALIST_PROFILE + FAIL:
      return data;
    case UPDATE_SPECIALIST_STEP_1 + SUCCESS: // like UPDATE_SPECIALIST_INDUSTRY
      return data;
    case UPDATE_SPECIALIST_STEP_1 + FAIL: // like UPDATE_SPECIALIST_INDUSTRY
      return data;
    case EDIT_EDUCATION_CARD_WITH_ID + SUCCESS:
      return data;
    case EDIT_EXPERIENCE_CARD_WITH_ID + SUCCESS:
      return data;
    case DELETE_EDUCATION_CARD_WITH_ID + SUCCESS:
      return data;
    case DELETE_EXPERIENCE_CARD_WITH_ID + SUCCESS:
      return data;
    case UPDATE_SPECIALIST_BILLINGS + SUCCESS:
      return data;
    case UPDATE_SPECIALIST_BILLINGS + FAIL:
      return data;
    default:
      return state;
    case UPDATE_SPECIALIST_STEP_2 + SUCCESS: // like UPDATE_SPECIALIST_INDUSTRY
      return data;
    case UPDATE_SPECIALIST_STEP_2 + FAIL: // like UPDATE_SPECIALIST_INDUSTRY
      return data;
  }
};
