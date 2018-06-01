import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLink from "./SubHeaderLink";

class SubHeaderLinkWrap extends Component {
  render() {
    return (
      <NavLink
        exact
        className="button"
        to={this.props.url}
        onClick={this.props.onClick}
      >
        <SubHeaderLink
          className={this.props.className}
          content={this.props.children}
        />
        <span>{this.props.label}</span>
      </NavLink>
    );
  }
}

export default SubHeaderLinkWrap;
