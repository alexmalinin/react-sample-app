import { createSelector } from "reselect";

// selector
const specialistId = state => state && state.id;

// reselect function
export const getSpecialistId = () => createSelector(specialistId, id => id);
