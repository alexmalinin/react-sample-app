import * as types from "./types";
import { fetch } from "../../utils";
import {
  GET,
  POST,
  createNotification,
  DELETE,
  PUT,
  displayError,
  REJECTED
} from "@utilities";
import { getFiles } from "./utils";
import { epic } from "../../schemas";
import history from "../../../history";
import { showConfirmationModal } from "@ducks/modals/actions";

const setProject = payload => ({
  type: types.SET_PROJECT,
  payload
});

const showEpics = (payload, projectId) => ({
  type: types.SHOW_EPICS,
  payload,
  projectId,
  meta: {
    schema: [epic]
  }
});

const setEpicsFail = payload => ({
  type: types.SHOW_EPICS + REJECTED,
  payload
});

export const getProjectEpics = projectId => (dispatch, getState) => {
  dispatch(setProject(projectId));

  fetch(GET, `/epics?project_id=${projectId}`)
    .then(res => {
      if (getState().epics.current === projectId) {
        dispatch(showEpics(res, projectId));
      }
    })
    .catch(error => {
      dispatch(setEpicsFail(error));
      console.error(error);
    });
};

const createEpic = payload => ({
  type: types.CREATE_EPIC,
  payload
});

export const epicCreated = (res, dispatch, props) => {
  const { name, project_id, id } = res.data;
  createNotification({
    type: "success",
    text: `${name ? `${name} module ` : "Module"} was created`
  });

  dispatch(createEpic(res));

  props.history.push(`/dashboard/project/${project_id}/module/${id}/edit`);
};

export const createEpicFetch = (values, dispatch, props) => {
  const { projectId: project_id } = props.match.params;

  return fetch(POST, `/projects/${project_id}/epics`, {
    epic: {
      ...values,
      project_id,
      attached_files_attributes: getFiles(values.file)
    }
  });
};

const updateEpic = payload => ({
  type: types.UPDATE_EPIC,
  payload
});

export const epicUpdated = (res, dispatch) => {
  dispatch(updateEpic(res));
};

export const epicSelfUpdate = values => dispatch => {
  let { project_id, id } = values;

  return fetch(PUT, `/projects/${project_id}/epics/${id}`, {
    epic: {
      ...values
    }
  }).then(response => dispatch(updateEpic(response)));
};

export const updateEpicFetch = values => {
  console.log("values", values);
  let { project_id, id } = values;
  return fetch(PUT, `/projects/${project_id}/epics/${id}`, {
    epic: {
      ...values,
      attached_files_attributes: getFiles(values.file)
    }
  });
};

const deleteEpic = payload => ({
  type: types.DELETE_EPIC,
  payload
});

export const deleteEpicFetch = (projectId, epicId, name) => dispatch => {
  const callback = () => {
    fetch(DELETE, `/projects/${projectId}/epics/${epicId}`)
      .then(res => {
        const { name, project_id } = res.data;
        createNotification({
          type: "success",
          text: `${name ? `${name} module ` : "Module"} was deleted`
        });

        dispatch(deleteEpic(res));

        history.push(`/dashboard/project/${project_id}`);
      })
      .catch(displayError);
  };

  dispatch(
    showConfirmationModal({
      type: "delete",
      message: `Are you sure you want to delete ${
        name ? `${name} module?` : "this module?"
      }`,
      callback
    })
  );
};
