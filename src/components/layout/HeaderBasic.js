import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dropdown, Popup } from "semantic-ui-react";

import StyledHeaderBasic from "../../styleComponents/layout/StyledHeaderBasic";
import { ContainerLarge } from "../../styleComponents/layout/Container";
import { SPECIALIST, CLIENT, S_REDGUY } from "../../constans/constans";
import { getUserRole } from "../../helpers/functions";

class Header extends Component {
  state = {
    activeItem: "home"
  };

  componentWillMount() {
    const { changeUserType } = this.props;
  }

  render() {
    const {
      page,
      specialistData,
      clientData,
      changeUserType,
      passive
    } = this.props;

    let isNavMenu = null;

    if (changeUserType === CLIENT && clientData) {
      if (clientData.first_name) {
        isNavMenu = true;
      }
    }

    if (changeUserType === SPECIALIST && specialistData) {
      if (specialistData.first_name) {
        isNavMenu = true;
      }
    }

    return (
      <StyledHeaderBasic className="header-basic">
        <ContainerLarge containerHeader>
          <a href="/">
            <span>Digital Village</span>
            {/* <img src='/images/logo_basic.png'/> */}
          </a>
          {(page || isNavMenu) && (
            <div className="right-links">
              {!passive && (
                <Fragment>
                  <NavLink
                    exact
                    activeClassName="current"
                    className="item-link"
                    to="/dashboard/"
                  >
                    <Popup
                      trigger={<i className="fas fa-columns" />}
                      content="Dashboard"
                    />
                  </NavLink>
                  <NavLink
                    activeClassName="current"
                    className="item-link"
                    to="/dashboard/epics"
                  >
                    <Popup
                      trigger={<i className="fas fa-tasks" />}
                      content="My epics"
                    />
                  </NavLink>
                  <NavLink
                    activeClassName="current"
                    className="item-link"
                    to="/dashboard/teams"
                  >
                    <Popup
                      trigger={<i className="fas fa-users" />}
                      content="Teams"
                    />
                  </NavLink>
                  <NavLink
                    activeClassName="current"
                    className="item-link"
                    to="/dashboard/account"
                  >
                    <Popup
                      trigger={<i className="far fa-credit-card" />}
                      content="Account"
                    />
                  </NavLink>
                </Fragment>
              )}
              <NavLink
                activeClassName="current"
                className="item-link"
                to="/dashboard/about"
              >
                <Popup
                  trigger={<i className="fas fa-user" />}
                  content="Profile"
                />
              </NavLink>
              {getUserRole() === S_REDGUY && (
                <NavLink
                  activeClassName="current"
                  className="item-link"
                  to="/dashboard/search"
                >
                  <Popup
                    trigger={<i className="fas fa-search" />}
                    content="Search"
                  />
                </NavLink>
              )}
              <NavLink
                activeClassName="current"
                className="item-link"
                onClick={this.logOut}
                to="/sign_in"
              >
                <Popup
                  trigger={<i className="fas fa-sign-out-alt" />}
                  content="Log out"
                />
              </NavLink>
            </div>
          )}
        </ContainerLarge>
      </StyledHeaderBasic>
    );
  }

  logOut = () => {
    localStorage.clear();
    window.location.reload();
  };
}

export default connect(
  ({ changeUserType, specialistData, clientData }) => ({
    changeUserType,
    specialistData,
    clientData
  }),
  null
)(Header);
