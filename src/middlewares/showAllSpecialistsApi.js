import axios from "axios";
import jwtDecode from "jwt-decode";
import { SUCCESS } from "../constans/constans";

export default store => next => action => {
  const { type, showAllSpecialists, ...rest } = action;
  if (!showAllSpecialists) return next(action);

  // let token = localStorage.getItem('jwt_token');
  // let { id } = jwtDecode(token);

  axios({
    method: "get",
    url: showAllSpecialists
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
