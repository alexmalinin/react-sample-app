import axios from "axios";
import { SUCCESS, FAIL } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, createEpicTask, payload, epic, ...rest } = action;
  if (!createEpicTask) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  let specialist_ids = [];
  payload["specIds"] &&
    payload["specIds"].split(",").forEach(id => specialist_ids.push(+id));

  axios({
    method: "post",
    url: createEpicTask,
    data: {
      task: {
        name: payload["name"],
        description: payload["description"],
        epic_id: epic,
        state: 0,
        specialist_ids,
        eta: payload["eta"]
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
