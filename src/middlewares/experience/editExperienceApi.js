import axios from "axios";
import { SUCCESS } from "../../constants/constants";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const {
    type,
    editExperienceCard1,
    editExperienceCard2,
    payload,
    ...rest
  } = action;
  if (!editExperienceCard1) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { user_id } = jwtDecode(token);

  axios({
    method: "put",
    url: editExperienceCard1 + user_id + editExperienceCard2,
    data: {
      work_experience: {
        name: payload["name"],
        country: payload["country"],
        city: payload["city"],
        position: payload["position"],
        started_at: payload["started_at"]["value"],
        finished_at: payload["finished_at"]["value"],
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
