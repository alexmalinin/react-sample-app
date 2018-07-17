import axios from "axios";
import { SUCCESS } from "../../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, deleteEducationCard1, deleteEducationCard2, ...rest } = action;
  if (!deleteEducationCard1) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "delete",
    url: deleteEducationCard1 + user_id + deleteEducationCard2,
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
