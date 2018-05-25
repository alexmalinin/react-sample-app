import axios from "axios";
import { SUCCESS } from "../constans/constans";

export default store => next => action => {
  const { type, showAllEpicsWithoutProject, ...rest } = action;
  if (!showAllEpicsWithoutProject) return next(action);

  axios({
    method: "get",
    url: showAllEpicsWithoutProject
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
