import mapKeys from "lodash/mapKeys";
import * as types from "./types";
import { fetch } from "../../utils";
import { GET, POST, createNotification, DELETE } from "../../../utilities";
import { teams, team, channels } from "../../schemas";

export const showTeams = (user, id) => {
  return {
    type: types.SHOW_TEAMS,
    payload: fetch(GET, `/${user}/${id}/teams`),
    meta: {
      schema: [teams]
    }
  };
};

export const showCustomTeams = id => dispatch => {
  fetch(GET, `/specialists/${id}/custom_teams`).then(({ data }) => {
    dispatch({
      type: types.SHOW_CUSTOM_TEAMS,
      payload: mapKeys(data, "id")
    });
  });
};

export const showProjectTeam = projectId => ({
  type: types.SHOW_PROJECT_TEAM,
  payload: fetch(GET, `/projects/${projectId}/teams`),
  meta: {
    schema: team
  }
});

export const showCustomTeam = id => ({
  type: types.SHOW_CUSTOM_TEAM,
  payload: fetch(GET, `/custom_team/${id}`),
  meta: {
    schema: team
  }
});

export const createCustomTeam = name => {
  return (dispatch, getState) => {
    dispatch({
      type: types.CREATE_CUSTOM_TEAM,
      payload: fetch(POST, "/teams", {
        team: {
          name,
          specialist_id: getState().user.id,
          custom_team: true
        }
      }),
      meta: {
        schema: team
      }
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

export const removeCustomTeam = team => {
  const { id, specialist_id } = team;

  return dispatch => {
    dispatch({
      type: types.DELETE_CUSTOM_TEAM,
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

export const showChannels = team => ({
  type: types.SHOW_TEAM_CHANNELS,
  payload: fetch(GET, `/teams/${team}/channels`),
  meta: {
    schema: [channels]
  }
});
