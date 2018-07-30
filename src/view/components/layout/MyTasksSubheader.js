import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

class MyTasksSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader profile="true" about="true" sidebarCondition>
        <div>
          <SubHeaderLinkWrap
            content="My tasks"
            url="/dashboard/epics"
            className="profileLink dv-button__circle"
          >
            &nbsp;
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

export default MyTasksSubHeader;
