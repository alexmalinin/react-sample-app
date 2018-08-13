import * as types from "./types";
import mapKeys from "lodash/mapKeys";
import { fetch, selectors } from "../../utils";
import {
  GET,
  SPECIALIST,
  CLIENT,
  POST,
  createNotification
} from "../../../utilities";

import { postProject } from "./utils";

export const showAllProjects = () => (dispatch, getState) => {
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
      type: types.PROJECTS_SHOW,
      payload: mapKeys(data, "id")
    });
  });
};

export const saveCreatedProgect = payload => (dispatch, getState) => {
  const state = getState(),
    auth = selectors.getAuth(state);

  const logo = payload["logo"] ? payload["logo"][0] : null;

  if (logo) {
    let reader = new FileReader();
    reader.readAsDataURL(logo);

    reader.onload = () => {
      dispatch({
        type: types.PROJECT_SAVE,
        payload: fetch(POST, `/projects`, {
          project: postProject(auth, payload, reader.result)
        })
      })
        .then(({ value: { data } }) => {
          createNotification({
            type: "success",
            text: `${
              data.name ? `${data.name} project ` : "Project"
            } was created`
          });
        })
        .catch(error => {
          createNotification({
            type: "error"
          });

          console.error(error);
        });
    };
  } else {
    dispatch({
      type: types.PROJECT_SAVE,
      payload: fetch(POST, `/projects`, {
        project: postProject(auth, payload)
      })
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} project ` : "Project"} was created`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  }
};
