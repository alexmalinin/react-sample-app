import mapKeys from "lodash/mapKeys";
import * as types from "./types";
import { fetch, selectors } from "../../utils";
import {
  GET,
  POST,
  createNotification,
  getUserUrl,
  DELETE
} from "../../../utilities";

/**
 * Get array of all teams, specialist assigned on
 * || Get array of all teams, assigned on customer projects
 *
 * @param  {number} id id of specialist
 */

export const showTeams = () => {
  return (dispatch, getState) => {
    const state = getState(),
      id = selectors.getUserId(state),
      userType = selectors.getUserType(state);

    const url = getUserUrl(userType);

    fetch(GET, `/${url}/${id}/teams`).then(({ data }) => {
      dispatch({
        type: types.SHOW_TEAMS,
        payload: mapKeys(data, "id")
      });
    });
  };
};

/**
 * Get all specialist custom teams by id
 *
 * @param  {number} id id of specialist
 */

export const showCustomTeams = id => {
  return dispatch => {
    fetch(GET, `/specialists/${id}/custom_teams`).then(({ data }) => {
      dispatch({
        type: types.SHOW_CUSTOM_TEAMS,
        payload: data
      });
    });
  };
};

/**
 * Create custom team
 *
 * @param  {object} data // payload
 * @param  {number} specialistId // The id of the specialist who is creating team
 */

export const createCustomTeam = (data, specialistId) => {
  return dispatch => {
    dispatch({
      type: types.CUSTOM_TEAM_CREATE,
      payload: fetch(POST, "/teams", {
        team: {
          name: data["name"],
          specialist_id: specialistId,
          custom_team: true
        }
      })
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} team ` : "Team"} was created`
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
 * Delete custom team
 *
 * @param  {object} team // team to delete
 */

export const removeCustomTeam = team => {
  const { id, specialist_id } = team;

  return dispatch => {
    dispatch({
      type: types.CUSTOM_TEAM_DELETE,
      payload: fetch(DELETE, `/teams/${id}/remove_team/${specialist_id}`)
    })
      .then(({ value: { data } }) => {
        createNotification({
          type: "success",
          text: `${data.name ? `${data.name} team ` : "Team"} was deleted`
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
