import * as types from "./types";
import { fetch } from "../../utils";
import { GET, SPECIALIST, CLIENT } from "../../../utilities";

export const showAllProjects = (usertype, id) => {
  let url;

  switch (usertype) {
    case SPECIALIST:
      url = `specialists/${id}/projects`;
      break;
    case CLIENT:
      url = `projects?customer_id=${id}`;
      break;
    default:
      break;
  }

  return {
    type: types.SHOW_ALL_PROJECTS,
    payload: fetch(GET, url)
  };
};
