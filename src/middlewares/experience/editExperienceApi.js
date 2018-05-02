import axios from "axios";
import { SUCCESS } from "../../constans/constans";
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
  let { id } = jwtDecode(token);

  console.log("midle", payload);

  // console.log(
  //     {
  //         "education": payload,
  //     }
  // )

  axios({
    method: "put",
    url: editExperienceCard1 + id + editExperienceCard2,
    data: {
      work_experience: payload
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
