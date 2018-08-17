import { createSelector } from "reselect";
import _ from "lodash";

const customTeams = ({ teamsReducer: { teams } }) => {
  switch (teams.constructor) {
    case Array:
      return teams.filter(team => team.custom_team);

    case Object:
      return _.filter(teams, team => team.custom_team);
    default:
      return [];
  }
};

export const getCustomTeams = () => createSelector(customTeams, teams => teams);
