import { createSelector } from "reselect";

// selector
const userId = state => state && state.id;

// reselect function
export const getSpecialistId = () => createSelector(userId, id => id);
