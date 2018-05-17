import axios from "axios";
import { SUCCESS } from "../constans/constans";

export default store => next => action => {
  const { type, getSkills, ...rest } = action;
  if (!getSkills) return next(action);

  axios({
    method: "get",
    url: getSkills
  })
    .then(response => {
      let data = response.data;
      data.successId = Math.random();

      return next({ type: type + SUCCESS, data, ...rest });
    })
    .catch(error => {
      console.log(error);
    });
};
