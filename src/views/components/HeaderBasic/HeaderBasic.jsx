import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import StyledHeaderBasic from "@styled/Header";
import StyledDropdown from "./StyledDropdown";

import {
  IMAGE_PORT,
  BLANK_AVATAR,
  S_CORE,
  S_REDGUY
} from "@utilities/constants";

import { userOperations } from "@ducks/user";

const HeaderBasic = ({
  firstName,
  lastName,
  avatar,
  passive,
  userRole,
  logout
}) => {
  return (
    <StyledHeaderBasic>
      <div className="nav-logo bordered">
        <a className="logo" href="/">
          <img src="/images/dv-logo.png" alt="digital village" />
        </a>
      </div>
      <div className="nav-links">
        {!passive && (
          <Fragment>
            {(userRole === S_CORE || userRole === S_REDGUY) && (
              <NavLink className="nav-link" to="/dashboard/search">
                <i className="fas fa-search" />
                Search
              </NavLink>
            )}
            <NavLink className="nav-link" to="/dashboard/teams">
              <i className="fas fa-users" />
              Teams
            </NavLink>
            <NavLink className="nav-link" exact to="/dashboard/">
              <i className="fas fa-columns" />
              Dashboard
            </NavLink>
          </Fragment>
        )}
      </div>
      <div className="nav-profile">
        <img
          src={avatar && avatar.url ? IMAGE_PORT + avatar.url : BLANK_AVATAR}
          alt={firstName + " " + lastName}
          className="user-avatar"
        />
        <p className="user-name">
          Hello, <br />
          {firstName}
        </p>
        <StyledDropdown
          on="click"
          className="nav-profile-dropdown"
          trigger={<i className="fas fa-chevron-down dropdown-trigger" />}
          basic
          hideOnScroll
        >
          <div className="inner-wrapper">
            <NavLink className="nav-link" to="/dashboard/about">
              <i className="fas fa-user" />
              Profile
            </NavLink>
            <NavLink className="nav-link" onClick={logout} to="#">
              <i className="fas fa-sign-out-alt" />
              Log out
            </NavLink>
          </div>
        </StyledDropdown>
      </div>
    </StyledHeaderBasic>
  );
};

HeaderBasic.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.object,
  userRole: PropTypes.string,
  logout: PropTypes.func.isRequired
};

HeaderBasic.defaultProps = {
  firstName: "Guest",
  lastName: "",
  avatar: { url: null },
  userRole: null
};

const mapStateToProps = ({ user: { role }, profile: { info } }) => ({
  firstName: info.first_name,
  lastName: info.last_name,
  avatar: info.avatar,
  userRole: role
});

export default connect(mapStateToProps, {
  logout: userOperations.logout
})(HeaderBasic);
