import mapKeys from "lodash/mapKeys";
import * as types from "./types";
import { fetch } from "../../utils";
import { GET, POST, createNotification } from "../../../utilities";

export const showTeams = id => {
  return dispatch => {
    fetch(GET, `/specialists/${id}/teams`).then(({ data }) => {
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
