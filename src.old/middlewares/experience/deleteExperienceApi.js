import axios from "axios";
import { SUCCESS } from "../../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const {
    type,
    deleteExperienceCard1,
    deleteExperienceCard2,
    ...rest
  } = action;
  if (!deleteExperienceCard1) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "delete",
    url: deleteExperienceCard1 + user_id + deleteExperienceCard2,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      console.log(response);
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
