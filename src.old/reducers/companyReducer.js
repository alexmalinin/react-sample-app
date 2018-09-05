import { isEqual } from "lodash";
import {
  COMPANY,
  EDIT_COMPANY_WITH_ID,
  UPDATE_SPECIALIST_STEP_1,
  SUCCESS
} from "../constants/constants";

export default (state = [], action) => {
  const { type, payload, id } = action;
  switch (type) {
    case COMPANY:
      return [...state, payload];
    case UPDATE_SPECIALIST_STEP_1 + SUCCESS:
      return [];
    case EDIT_COMPANY_WITH_ID:
      console.log("state", state);
      console.log("id", id);
      payload.companySuccessId = id;
      return state.map(item => {
        return item.companySuccessId === id ? payload : item;
      });
    default:
      return state;
  }
};
