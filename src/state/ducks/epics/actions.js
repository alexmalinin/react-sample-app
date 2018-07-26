import * as types from "./types";
import mapKeys from "lodash/mapKeys";
import { fetch } from "../../utils";
import { GET, POST, createNotification, DELETE } from "../../../utilities";

/**
 * Get all epics by project id
 *
 * @param  {object} data epic data
 * @param  {number} project project id
 */

export const showAllEpics = projectId => {
  return dispatch => {
    fetch(GET, `/epics?project_id=${projectId}`)
      .then(({ data }) => {
        dispatch({
          type: types.EPICS_SHOW,
          payload: mapKeys(data, "id"),
          projectId
        });
      })
      .catch(error => console.log(error));
  };
};

/**
 * Post project Epic
 *
 * @param  {object} data epic data
 * @param  {number} projectId project id
 */

export const createProjectEpic = (data, projectId) => {
  const files = data.file
    ? data["file"].map(({ document, title, size }) => {
        return {
          document,
          title,
          size,
          entity_type: "Module"
        };
      })
    : [];

  const body = {
    epic: {
      name: data["name"],
      project_id: projectId,
      user_story: data["user_story"],
      business_requirements: data["business_requirements"],
      business_rules: data["business_rules"],
      deliverables: data["deliverables"],
      description: data["description"],
      notes: data["notes"],
      eta: data["eta"],
      attached_files_attributes: files
    }
  };

  return dispatch => {
    dispatch({
      type: types.PROJECT_EPIC_CREATE,
      payload: fetch(POST, `/projects/${projectId}/epics`, body),
      meta: {
        projectId
      }
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} module ` : "Module"} was created`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
};

/**
 * Delete epic by project and id
 *
 * @param  {number} projectId project id
 * @param  {number} epicId epic id
 * @param  {function} callback a function that gets fired after successful response
 */

export function deleteProjectEpic(projectId, epicId, callback) {
  return dispatch => {
    dispatch({
      type: types.PROJECT_EPIC_DELETE,
      payload: fetch(DELETE, `/projects/${projectId}/epics/${epicId}`),
      meta: {
        projectId
      }
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} module ` : "Module"} was deleted`
        });

        if (callback) {
          callback();
        }
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };
}
