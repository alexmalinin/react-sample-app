import { createSelector } from "reselect";
import filter from "lodash/filter";

const projects = (projects, ...filters) =>
  projects.allIds.map(id => projects.byId[id]);

export const getSortedProjects = (...filters) =>
  createSelector(projects, projects =>
    filter(projects, project =>
      filters.some(filter => filter === project.state)
    )
  );
