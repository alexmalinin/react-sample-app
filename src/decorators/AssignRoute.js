import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { PORT } from "../constans/constans";

const checkAuth = () => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    return false;
  }

  return true;
};

const handleRequset = (props, path) => {
  return axios({
    method: "PUT",
    url: PORT + props.match.url
  })
    .then(res => {
      return true;
    })
    .catch(error => {
      const {
        response: { data }
      } = error;

      if (data) {
        props.history.push({
          pathname: path,
          state: data
        });
      }

      console.error(error);
      return false;
    });
};

export default function AssignRoute({ assignPath, ...rest }) {
  let path = assignPath,
    result = null;

  return (
    <Route
      {...rest}
      render={props => {
        if (props.match.params) {
          let params = { ...props.match.params };

          for (let element in params) {
            if (path.indexOf(element) !== -1) {
              path = path.replace(`:${element}`, params[element]);
            }
          }
        }

        if (!props.location.from) {
          result = handleRequset(props, path);
        }

        result &&
          result.then(res => {
            if (res && checkAuth()) {
              props.history.push(path);
            }
          });

        if (
          props.location.from &&
          props.location.from.pathname === "/sign_in"
        ) {
          return <Redirect to={path} />;
        }

        if (!checkAuth()) {
          return (
            <Redirect
              to={{
                pathname: "/sign_in",
                state: { from: props.location }
              }}
            />
          );
        } else {
          return null;
        }
      }}
    />
  );
}
