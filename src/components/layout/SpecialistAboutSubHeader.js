import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

class AboutSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader profile="true" about="true" sidebarCondition>
        <div>
          <SubHeaderLinkWrap
            content="Profile"
            url="/dashboard/about"
            className="profileLink dv-button__circle"
          >
            &nbsp;
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

export default AboutSubHeader;
