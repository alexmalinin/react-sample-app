import * as types from "./types";
import { fetch } from "../../utils";
import { GET } from "../../../utilities";
import { prepareSkillsForSelect } from "./utils";

export const getSkills = () => {
  return dispatch => {
    fetch(GET, "/skills").then(({ data }) => {
      dispatch({
        type: types.GET_SKILLS,
        payload: prepareSkillsForSelect(data)
      });
    });
  };
};
