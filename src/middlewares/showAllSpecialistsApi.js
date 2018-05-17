import axios from "axios";
import { SUCCESS } from "../constans/constans";

export default store => next => action => {
  const { type, showAllSpecialists, roles, ...rest } = action;
  if (!showAllSpecialists) return next(action);

  axios({
    method: "get",
    url: `${showAllSpecialists}${roles ? "?roles=" + roles.join(",") : ""}`
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
