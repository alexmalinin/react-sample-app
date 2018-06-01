import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

class AboutSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader profile="true" about="true" sidebarCondition>
        <div className="left">
          <SubHeaderLinkWrap
            label="Profile"
            url="/dashboard/about"
            className="profileLink"
          >
            <i className="fas fa-user" />
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

export default AboutSubHeader;
