import * as types from "./types";
import { fetch } from "../../utils";
import { GET } from "../../../utilities";

export const getSkills = () => ({
  type: types.GET_SKILLS,
  payload: fetch(GET, "/skills")
});
