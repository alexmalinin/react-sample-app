import { createSelector } from "reselect";
import _ from "lodash";

const customTeams = teams => {
  switch (teams.constructor) {
    case Array:
      return teams.filter(team => team.custom_team);

    case Object:
      return _.filter(teams, team => team.custom_team);
    default:
      return [];
  }
};

const projectTeam = (teams, projectId) => {
  const key = _.findKey(teams, { project_id: +projectId });
  return teams[key];
};

export const getCustomTeams = () => createSelector(customTeams, teams => teams);
export const getProjectTeam = () => createSelector(projectTeam, team => team);
