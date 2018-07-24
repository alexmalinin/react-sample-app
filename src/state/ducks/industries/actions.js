import * as types from "./types";
import { fetch } from "../../utils";
import { GET } from "../../../utilities";

export const getIndustries = () => ({
  type: types.GET_INDUSTRIES,
  payload: fetch(GET, "/industry_areas")
});
