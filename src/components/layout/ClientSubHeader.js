import React, { Component } from "react";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import SubHeaderItemWrap from "../forms/renders/SubHeaderItemWrap";
import ProgressBars from "../layout/ProgressBar";

class SubHeader extends Component {
  render() {
    return (
      <StyledSubHeader profileForm="true">
        <div className="progressBarsLink">
          <SubHeaderItemWrap content="1" path="profile">
            My Profile
            <ProgressBars percents={this.props.percents.profilePercent} />
          </SubHeaderItemWrap>

          <SubHeaderItemWrap content="2" path="company">
            My Company
            <ProgressBars percents={this.props.percents.companyPercent} />
          </SubHeaderItemWrap>

          <SubHeaderItemWrap content="3" path="billing">
            My Billings
            <ProgressBars percents={this.props.percents.billingPercent} />
          </SubHeaderItemWrap>
        </div>
        <div>
          <SubHeaderLinkWrap url="/dashboard/" className="rightLink arrow">
            <span />
            Complete Later
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

export default SubHeader;

// <NavLink className="button" to="/client/dashboard/profile">My Profile</NavLink>
//                 <NavLink className="button" to="/client/dashboard/company">My Company</NavLink>
//                 <NavLink className="button" to="/client/dashboard/billing">My Billing</NavLink>
//                 <NavLink className="button" to="/client/dashboard/projects">Projects</NavLink>
//                 <NavLink className="button" to="/client/dashboard/my_teams">My Teams</NavLink>
