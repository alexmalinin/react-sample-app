import axios from "axios";
import { PORT } from "../../utilities";

export default (method, path, data) => {
  return axios({
    method,
    url: `${PORT}/api/v1${path}`,
    headers: requestHeaders(),
    data
  });
};

function requestHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
  };
}
