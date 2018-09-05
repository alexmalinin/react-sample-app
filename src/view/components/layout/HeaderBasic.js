import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import StyledHeaderBasic from "../../styleComponents/layout/StyledHeaderBasic";
import {
  IMAGE_PORT,
  BLANK_AVATAR,
  SPECIALIST,
  CLIENT,
  S_CORE,
  S_REDGUY
} from "utilities/constants";
import { signInOperations } from "state/ducks/signIn";
import { oneOfRoles, getUserType } from "view/utils/functions";
import { StyledDropdown } from "../../styleComponents/layout/StyledAssignDropdown";

class Header extends Component {
  state = {
    activeItem: "home"
  };

  render() {
    const { page, specialistData, clientData, passive, logOut } = this.props;

    let user;
    let isNavMenu = null;

    switch (getUserType()) {
      case CLIENT:
        user = clientData;
        break;
      case SPECIALIST:
        user = specialistData;
        break;
      default:
        break;
    }

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
              {oneOfRoles(S_CORE, S_REDGUY) && (
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
            src={
              user && user.avatar.url
                ? IMAGE_PORT + user.avatar.url
                : BLANK_AVATAR
            }
            alt={user && user.first_name + " " + user.last_name}
            className="user-avatar"
          />
          <p className="user-name">
            Hello, <br />
            {user && user.first_name}
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
              <NavLink className="nav-link" onClick={logOut} to="#">
                <i className="fas fa-sign-out-alt" />
                Log out
              </NavLink>
            </div>
          </StyledDropdown>
        </div>
      </StyledHeaderBasic>
    );
  }
}

export default connect(
  ({ changeUserType, specialistData, clientData }) => ({
    changeUserType,
    specialistData,
    clientData
  }),
  { logOut: signInOperations.logOut }
)(Header);
