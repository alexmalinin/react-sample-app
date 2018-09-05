import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

class AboutSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader account sidebarCondition>
        <div className="left statements">
          <SubHeaderLinkWrap url="/dashboard/account" label="Account">
            <i className="fas fa-wallet" />
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap url="/dashboard/year_to_date" label="Year To Date">
            YTD
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap label="Statements" url="/dashboard/statement">
            {/*  */}
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

export default AboutSubHeader;
