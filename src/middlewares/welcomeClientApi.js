import axios from "axios";
import { SUCCESS } from "../constans/constans";
import jwtDecode from "jwt-decode";

export default store => next => action => {
  const { type, welcomeClient, payload, ...rest } = action;
  if (!welcomeClient) return next(action);

  let token = localStorage.getItem("jwt_token");
  let { id } = jwtDecode(token);

  axios({
    method: "put",
    url: welcomeClient + id,
    data: {
      customer: {
        we_are: `${payload["we_are"]["label"]}`,
        address_attributes: {
          country: `${payload["country"]}`,
          city: `${payload["city"]}`,
          user_id: id
        },
        industry: `${payload["industry"]}`,
        description: `${payload["description"]}`
      }
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function(response) {
      return next({ ...rest, type: type + SUCCESS, data: response.data });
    })
    .catch(function(error) {
      console.log({
        customer: {
          password: `${payload["password"]}`,
          password_confirmation: `${payload["password_confirmation"]}`
        }
      });
      console.log(error);
    });
};
