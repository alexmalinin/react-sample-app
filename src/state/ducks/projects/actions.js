import * as types from "./types";
import mapKeys from "lodash/mapKeys";
import { fetch, selectors } from "../../utils";
import { GET, SPECIALIST, CLIENT, POST } from "../../../utilities";

export const showAllProjects = (usertype, id) => {
  return (dispatch, getState) => {
    const state = getState(),
      id = selectors.getUserId(state),
      userType = selectors.getUserType(state);

    let url;

    switch (userType) {
      case SPECIALIST:
        url = `/specialists/${id}/projects`;
        break;
      case CLIENT:
        url = `/projects?customer_id=${id}`;
        break;
      default:
        break;
    }

    fetch(GET, url).then(({ data }) => {
      dispatch({
        type: types.SHOW_ALL_PROJECTS,
        payload: mapKeys(data, "id")
      });
    });
  };
};
