import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

class AboutSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader profile="true">
        <div>
          <SubHeaderLinkWrap
            content="Profile"
            url="/dashboard/about"
            className="profileLink"
          >
            &nbsp;
          </SubHeaderLinkWrap>
        </div>
        <div>
          <SubHeaderLinkWrap url="#" className="rightLink arrow">
            <span />
            Save
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap content="3/9" url="#" className="rightLink">
            Profile
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap content="5%" url="#" className="rightLink">
            Progress
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

export default AboutSubHeader;
