import * as types from "./types";
import { fetch } from "../../utils";
import { GET, POST, DELETE, createNotification } from "../../../utilities";
import { task } from "../../schemas";
import { getFiles, getSpecialistIds } from "./utils";

const showSpecialistTasks = payload => ({
  type: types.SHOW_SPECIALIST_TASKS,
  payload,
  meta: {
    schema: [task]
  }
});

export const getSpecialistTasks = id => dispatch =>
  fetch(GET, `/specialists/${id}/tasks`).then(response =>
    dispatch(showSpecialistTasks(response))
  );

const showEpicTasks = payload => ({
  type: types.SHOW_EPIC_TASKS,
  payload,
  meta: {
    schema: [task]
  }
});

export const getEpicTasks = epic => dispatch =>
  fetch(GET, `/epics/${epic}/tasks`).then(({ data }) => {
    dispatch(showEpicTasks(data));
  });

export const createEpicTask = payload => dispatch =>
  dispatch({
    type: types.EPIC_TASK_CREATE,
    payload: fetch(POST, `/epics/${payload.epic}/tasks`, {
      task: {
        ...payload,
        epic_id: payload.epic,
        state: 0,
        specialist_ids: getSpecialistIds(payload.specIds),
        attached_files_attributes: getFiles(payload.file)
      },

      attached_files_attributes: {
        document: payload["file"]
      }
    })
  })
    .then(({ value: { data } }) => {
      createNotification({
        type: "success",
        text: `${data.name ? `${data.name} epic ` : "Epic"} was created`
      });
    })
    .catch(error => {
      createNotification({
        type: "error"
      });

      console.error(error);
    });

/**
 * Delete task by epic
 *
 * @param  {number} epic epic id
 * @param  {number} task task id
 * @param  {function} callback delete card from board
 */

export const deleteEpicTask = (epic, task, callback) => {
  return dispatch => {
    dispatch({
      type: types.EPIC_TASK_DELETE,
      payload: fetch(DELETE, `/epics/${epic}/tasks/${task}`)
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} epic ` : "Epic"} was deleted`
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
};
