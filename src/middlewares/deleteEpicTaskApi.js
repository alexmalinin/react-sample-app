import axios from "axios";
import { SUCCESS, FAIL } from "../constants/constants";

export default store => next => action => {
  const { type, deleteEpicTask, payload, epic, ...rest } = action;
  if (!deleteEpicTask) return next(action);

  axios({
    method: "delete",
    url: deleteEpicTask
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      let data = {};
      data.successId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
