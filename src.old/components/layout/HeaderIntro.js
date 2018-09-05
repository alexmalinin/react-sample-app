import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import StyledHeaderBasic from "../../styleComponents/layout/StyledHeaderBasic";

class Header extends Component {
  componentDidMount() {
    if (localStorage.getItem("jwt_token")) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <StyledHeaderBasic className="sign-in">
        <div className="nav-logo">
          <a className="logo" href="/">
            <img src="/images/dv-logo.png" alt="digital village" />
            {/* <span>Digital Village</span> */}
          </a>
        </div>
        <div className="nav-links sign-links">
          <NavLink className="nav-link" to="/sign_in">
            Sign In
          </NavLink>
          <NavLink className="nav-link" to="/sign_up">
            Sign Up
          </NavLink>
        </div>
      </StyledHeaderBasic>
    );
  }
}

export default withRouter(Header);
