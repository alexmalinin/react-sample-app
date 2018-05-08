import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

class AboutSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader account sidebarCondition>
        <div>
          <SubHeaderLinkWrap
            content="Account"
            url="/dashboard/account"
            className="accountSub dv-button__circle"
          />

          <SubHeaderLinkWrap
            content="YTD"
            url="/dashboard/year_to_date"
            className="accountSub dv-button__circle"
          />

          <SubHeaderLinkWrap
            content="statements"
            url="/dashboard/statement"
            className="accountSub dv-button__circle"
          />
        </div>
      </StyledSubHeader>
    );
  }
}

export default AboutSubHeader;
