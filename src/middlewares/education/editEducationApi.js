import axios from "axios";
import { SUCCESS } from "../../constants/constants";
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
      education: {
        name: payload["name"],
        specialisation: payload["specialisation"],
        started_at: payload["started_at"]["value"],
        finished_at: payload["finished_at"]["value"],
        degree: payload["degree"],
        description: payload["description"]
      }
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};
