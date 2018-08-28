import * as types from "./types";
import mapKeys from "lodash/mapKeys";
import { fetch } from "../../utils";
import { GET, POST, createNotification, DELETE } from "../../../utilities";

export const getAllEpics = projectId => {
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

export const createEpicFetch = (values, dispatch, props) => {
  const { projectId: project_id } = props.match.params;

  const files = values.file
    ? values["file"].map(({ document, title, size }) => {
        return {
          document,
          title,
          size,
          entity_type: "Module"
        };
      })
    : [];

  return fetch(POST, `/projects/${project_id}/epics`, {
    epic: {
      ...values,
      project_id,
      attached_files_attributes: files
    }
  });
};

export const createEpic = (res, dispatch, props) => {
  const { name, project_id, id } = res.data;
  createNotification({
    type: "success",
    text: `${name ? `${name} module ` : "Module"} was created`
  });
  dispatch({
    type: types.CREATE_EPIC,
    payload: res.data
  });
  props.history.push(`/dashboard/project/${project_id}/module/${id}/edit`);
};

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
