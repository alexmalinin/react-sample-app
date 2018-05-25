import axios from "axios";
import { SUCCESS } from "../constans/constans";

export default store => next => action => {
  const { type, showAllEpicTasks, ...rest } = action;
  if (!showAllEpicTasks) return next(action);

  axios({
    method: "get",
    url: showAllEpicTasks
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
