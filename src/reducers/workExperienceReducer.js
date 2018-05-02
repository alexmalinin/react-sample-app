import {
  WORK_EXPERIENCE,
  CLEAR_WORK_EXPERIENCE,
  UPDATE_SPECIALIST_PROFILE,
  EDIT_EXPERIENCE_CARD_WITHOUT_ID,
  DELETE_EXPERIENCE_CARD_WITHOUT_ID,
  SUCCESS
} from "../constans/constans";
import { isEqual } from "lodash";

export default (state = [], action) => {
  const { type, payload, id } = action;
  switch (type) {
    case WORK_EXPERIENCE:
      return [...state, payload];
    case CLEAR_WORK_EXPERIENCE:
      return [];
    case UPDATE_SPECIALIST_PROFILE + SUCCESS:
      return [];
    case EDIT_EXPERIENCE_CARD_WITHOUT_ID:
      console.log("state", state);
      console.log("id", id);
      payload.experienceSuccessId = id;
      return state.map(item => {
        return item.experienceSuccessId === id ? payload : item;
      });
    case DELETE_EXPERIENCE_CARD_WITHOUT_ID:
      return state.filter(item => !isEqual(item, payload));
    default:
      return state;
  }
};
