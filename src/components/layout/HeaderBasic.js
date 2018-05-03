import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

import StyledHeaderBasic from "../../styleComponents/layout/StyledHeaderBasic";
import { ContainerLarge } from "../../styleComponents/layout/Container";

import { showSpecialistData, showClientData } from "../../actions/actions";
import { CLIENT, SPECIALIST } from "../../constans/constans";

class Header extends Component {
  state = {
    activeItem: "home"
  };

  componentWillMount() {
    const { showSpecialistData, showClientData, changeUserType } = this.props;

    if (changeUserType === CLIENT) {
      showClientData();
    } else if (changeUserType === SPECIALIST) {
      showSpecialistData();
    }
  }

  renderDropdown = () => {
    const { changeUserType, clientData, specialistData } = this.props;

    if (changeUserType === CLIENT && clientData) {
      return (
        <Dropdown
          text={clientData.first_name + " " + clientData.last_name}
          basic
          closeOnChange={false}
          item={true}
          icon={
            <div className="drop-icon">
              <span />
            </div>
          }
          onChange={() => {}}
        >
          <Dropdown.Menu>
            <Dropdown.Item>
              <NavLink to="/dashboard/">Dashboard</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/dashboard/teams">Teams</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink onClick={this.logOut} to="/sign_up">
                Log out
              </NavLink>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else if (changeUserType === SPECIALIST && specialistData) {
      return (
        <Dropdown
          text={specialistData.first_name + " " + specialistData.last_name}
          basic
          className="log-dropdown"
          item
          closeOnChange={false}
          icon={
            <div className="drop-icon">
              <span />
            </div>
          }
          onChange={() => {}}
        >
          <Dropdown.Menu>
            <Dropdown.Item>
              <NavLink to="/dashboard/">Dashboard</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/dashboard/about">My profile</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/dashboard/account">Account Billings</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/dashboard/teams">Teams</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink onClick={this.logOut} to="/sign_up">
                Log out
              </NavLink>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  render() {
    const { page } = this.props;

    let isNavMenu = null;

    if (clientData) {
      if (clientData.first_name) {
        isNavMenu = true;
      }
    }

    if (specialistData) {
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
              <NavLink
                activeClassName="current"
                className="button icon-dashboard"
                to="/dashboard/"
              >
                &nbsp;
              </NavLink>
              <NavLink
                activeClassName="current"
                className="button icon-teams"
                to="/dashboard/teams"
              >
                &nbsp;
              </NavLink>
              <NavLink
                activeClassName="current"
                className="button icon-billing"
                to="/dashboard/account"
              >
                &nbsp;
              </NavLink>
              <NavLink
                activeClassName="current"
                className="button icon-avatar"
                to="/dashboard/profile"
              >
                &nbsp;
              </NavLink>
              {/* this.renderDropdown() */}
              <NavLink
                activeClassName="current"
                className="button icon-logout"
                onClick={this.logOut}
                to="/sign_up"
              >
                &nbsp;
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
  { showSpecialistData, showClientData }
)(Header);
