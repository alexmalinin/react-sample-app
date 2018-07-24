import mapKeys from "lodash/mapKeys";
import * as types from "./types";
import { fetch } from "../../utils";
import { GET, POST, PUT, DELETE, createNotification } from "../../../utilities";

/**
 * Show all chanels of team
 *
 * @param  {number} team team id
 */

export const showChannels = team => {
  return dispatch => {
    fetch(GET, `/teams/${team}/channels`).then(({ data }) => {
      dispatch({
        type: types.CHANNELS_SHOW,
        payload: mapKeys(data, "id")
      });
    });
  };
};

/**
 * Create team channel
 *
 * @param  {number} team team id
 * @param  {object} data channel data
 */

export const createTeamChannel = (team, data) => {
  return dispatch => {
    dispatch({
      type: types.CHANNEL_CREATE,
      payload: fetch(POST, `/teams/${team}/channels`, data)
    }).catch(error => {
      createNotification({
        type: "error"
      });

      console.error(error);
    });
  };
};

/**
 * Update team channel
 *
 * @param  {number} team team id
 * @param  {number} channel channel id
 * @param  {object} data channel data
 */

export const updateTeamChannel = (team, channel, data) => {
  return dispatch => {
    dispatch({
      type: types.CHANNEL_UPDATE,
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
      type: types.CHANNEL_DELETE,
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
