import mapKeys from "lodash/mapKeys";
import * as types from "./types";
import { fetch } from "../../utils";
import { POST, PUT, DELETE, createNotification } from "@utilities";

export const createTeamChannel = (team, data) => {
  return dispatch => {
    dispatch({
      type: types.CREATE_CHANNEL,
      payload: fetch(POST, `/teams/${team}/channels`, data)
    }).catch(error => {
      createNotification({
        type: "error"
      });

      console.error(error);
    });
  };
};

export const updateTeamChannel = (team, channel, data) => {
  return dispatch => {
    dispatch({
      type: types.UPDATE_CHANNEL,
      payload: fetch(PUT, `/teams/${team}/channels/${channel}`, data)
    }).catch(error => {
      createNotification({
        type: "error"
      });

      console.error(error);
    });
  };
};

/**
 * Delete team channel
 *
 * @param  {number} team team id
 * @param  {number} channel channel id
 */

export const deleteTeamChannel = (team, channel) => {
  return dispatch =>
    dispatch({
      type: types.DELETE_CHANNEL,
      payload: fetch(DELETE, `/teams/${team}/channels/${channel}`)
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} channel ` : "Channel"} was deleted`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
};
