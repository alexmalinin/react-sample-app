import axios from "axios";
import { SUCCESS, FAIL } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, createEpicTask, payload, epic, ...rest } = action;
  if (!createEpicTask) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "post",
    url: createEpicTask,
    data: {
      task: {
        name: payload["name"],
        description: payload["description"],
        epic_id: epic,
        state: 0
      }
    },

    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      let data = response.data;
      data.successId = Math.random();
      return next({ ...rest, type: type + SUCCESS, data: data });
    })
    .catch(function() {
      let data = {};
      data.successId = Math.random();
      return next({ ...rest, type: type + FAIL, data: data });
    });
};
