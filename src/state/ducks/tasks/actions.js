import * as types from "./types";
import { fetch } from "../../utils";
import { GET, POST, DELETE, createNotification } from "../../../utilities";
import { task } from "../../schemas";

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

export const createEpicTask = (data, epic, callback) => {
  return dispatch => {
    const files = data.file
      ? data.file.map(({ document, title, size }) => {
          return {
            document,
            title,
            size,
            entity_type: "Task"
          };
        })
      : [];

    const specialist_ids = [];
    data["specIds"] &&
      data["specIds"].split(",").forEach(id => specialist_ids.push(+id));

    const body = {
      task: {
        name: data["name"],
        description: data["description"],
        epic_id: epic,
        state: 0,
        specialist_ids,
        eta: data["eta"],
        cost: data["cost"],
        user_story: data["user_story"],
        deliverables: data["deliverables"],
        business_requirements: data["business_requirements"],
        business_rules: data["business_rules"],
        notes: data["notes"],
        attached_files_attributes: files
      },

      attached_files_attributes: {
        document: data["file"]
      }
    };

    dispatch({
      type: types.EPIC_TASK_CREATE,
      payload: fetch(POST, `/epics/${epic}/tasks`, body)
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} epic ` : "Epic"} was created`
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
