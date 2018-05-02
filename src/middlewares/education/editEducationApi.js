import axios from "axios";
import { SUCCESS } from "../../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const {
    type,
    editEducationCard1,
    editEducationCard2,
    payload,
    ...rest
  } = action;
  if (!editEducationCard1) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "put",
    url: editEducationCard1 + id + editEducationCard2,
    data: {
      education: payload
    },
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
