import * as types from "./types";
import mapKeys from "lodash/mapKeys";

import history from "../../../history";

import { fetch, selectors } from "../../utils";
import {
  GET,
  SPECIALIST,
  CLIENT,
  POST,
  createNotification,
  PUT,
  S_REDGUY
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

/**
 * Create project
 *
 * @param  {object} payload project data
 * @param  {function} calback  calback
 */

export const saveCreatedProgect = (payload, calback) => (
  dispatch,
  getState
) => {
  const state = getState(),
    auth = state.user;

  const logo = payload["logo"] ? payload["logo"][0] : null;

  if (logo) {
    let reader = new FileReader();
    reader.readAsDataURL(logo);

    reader.onload = () => {
      return dispatch({
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

          calback();
          history.push(`/dashboard/project/${data.id}`);
        })
        .catch(error => {
          createNotification({
            type: "error"
          });

          calback();
        });
    };
  } else {
    return dispatch({
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

        calback();
        history.push(`/dashboard/project/${data.id}`);
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        calback();
      });
  }
};

/**
 * Publish project
 *
 * @param  {object} payload project data
 */

export const publishProject = payload => (dispatch, getState) => {
  const state = getState(),
    userRole = state.user.role;

  let skill_ids =
    payload["skills"] &&
    payload["skills"].map(skill => {
      return skill.value;
    });

  let files = payload.file
    ? payload.file.map(file => {
        return {
          document: file,
          entity_type: "Project"
        };
      })
    : [];

  let status = null,
    redGuyId = payload["red_guy_id"];

  if (userRole === S_REDGUY) {
    status = "discovery";
  } else {
    if (redGuyId) {
      status = "reviewed_by_admin";
    } else {
      status = payload["state"];
    }
  }

  const body = {
    project: {
      name: payload["name"],
      description: payload["description"],
      user_story: payload["user_story"],
      state: status,
      business_requirements: payload["business_requirements"],
      business_rules: payload["business_rules"],
      deliverables: payload["deliverables"],
      further_notes: payload["further_notes"],
      attached_files_attributes: files,
      skill_ids
    },
    review: payload.state === "reviewed_by_admin"
    // attached_files_attributes: files,
  };

  return fetch(PUT, `/projects/${payload.id}`, body)
    .then(({ data }) => {
      dispatch(showProject(data));

      createNotification({
        type: "success",
        text: `${data.name ? `${data.name} project ` : "Project"} was published`
      });
    })
    .catch(error => {
      createNotification({
        type: "error"
      });

      console.error(error);
    });
};

/**
 * Update project
 *
 * @param  {number} id project id
 * @param  {object} payload project data
 */

export const updateProject = (id, payload) => dispatch => {
  if (payload) {
    dispatch(showProject(payload));
  } else {
    fetch(GET, `/projects/${id}`).then(({ data }) => {
      dispatch(showProject(data));
    });
  }
};

const showProject = payload => ({
  type: types.PROJECT_UPDATE,
  payload
});
