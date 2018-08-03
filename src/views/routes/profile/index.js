import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import info from "./info";

const Profile = ({ match }) => (
  <div>
    <Route path={`${match.url}/info`} component={info} />
    <Route path={`${match.url}/info`} component={info} />
  </div>
);

Profile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default Profile;
