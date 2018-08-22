import { createSelector } from "reselect";
import _ from "lodash";

const sortedProjects = (projects, ...filters) =>
  _.filter(projects, project =>
    filters.some(filter => filter === project.state)
  );

export const getSortedProjects = () =>
  createSelector(sortedProjects, projects => projects);
