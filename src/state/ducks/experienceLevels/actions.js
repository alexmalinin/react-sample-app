import * as types from "./types";
import { fetch } from "../../utils";
import { GET } from "../../../utilities";

/**
 * Get all experience levels
 */

export const getExperienceLevels = () => (dispatch, getState) => {
  const state = getState();

  if (!state.experienceLevelsReducer.loaded) {
    dispatch({
      type: types.GET_EXPERIENCE_LEVELS,
      payload: fetch(GET, "/experience_levels")
    });
  }
};
