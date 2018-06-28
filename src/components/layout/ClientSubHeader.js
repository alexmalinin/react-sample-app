import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import SubHeaderItemWrap from "../forms/renders/SubHeaderItemWrap";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import ProgressBars from "../layout/ProgressBar";
import { getAllUrlParams } from "../../helpers/functions";

class SubHeader extends Component {
  state = {
    isEditing: false
  };

  componentWillMount() {
    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  render() {
    const { user, page, isEdited } = this.props;

    return (
      <StyledSubHeader profileForm="true" greenGradient>
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
          {page !== "profile" ? (
            !this.state.isEditing ? (
              // <SubHeaderLinkWrap
              //   url="/dashboard/"
              //   label="Complete Later"
              //   className="right-link arrow"
              // />
              <NavLink exact className="button" to="/dashboard/">
                <StyledSubHeaderLink className="right-link arrow" />
                Complete Later
                <span />
              </NavLink>
            ) : null
          ) : null}
        </div>
      </StyledSubHeader>
    );
  }
}

export default SubHeader;
