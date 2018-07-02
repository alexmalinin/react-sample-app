import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SubHeaderItemWrap from "../forms/renders/SubHeaderItemWrap";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import ProgressBars from "../layout/ProgressBar";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import { getAllUrlParams, getUserRole } from "../../helpers/functions";
import { S_PASSIVE } from "../../constants/user";

class SubHeader extends Component {
  state = {
    isEditing: false
  };

  componentWillMount() {
    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });

    console.log(getUserRole());
  }

  render() {
    const { page } = this.props;

    return (
      <StyledSubHeader profileForm="true" greenGradient>
        <div className="progressBarsLink">
          <SubHeaderItemWrap content="1" path="profile">
            My Profile
            <ProgressBars percents={this.props.percents.profilePercent} />
          </SubHeaderItemWrap>

          <SubHeaderItemWrap content="2" path="industry">
            My Services
            <ProgressBars percents={this.props.percents.industryPercent} />
          </SubHeaderItemWrap>

          <SubHeaderItemWrap content="3" path="company">
            My Company
            <ProgressBars percents={this.props.percents.companyPercent} />
          </SubHeaderItemWrap>

          <SubHeaderItemWrap content="4" path="billings">
            My Billings
            <ProgressBars percents={this.props.percents.billingPercent} />
          </SubHeaderItemWrap>
        </div>
        <div>
          {!this.state.isEditing ? (
            page === "info" || page === "industry" ? null : (
              // <SubHeaderLinkWrap
              //   url={
              //     getUserRole() === S_PASSIVE
              //       ? "/dashboard/about"
              //       : "/dashboard/"
              //   }
              //   label="Complete Later"
              //   className="right-link arrow"
              // />
              <NavLink
                exact
                className="button"
                to={
                  getUserRole() === S_PASSIVE
                    ? "/dashboard/about"
                    : "/dashboard/"
                }
              >
                <StyledSubHeaderLink className="right-link arrow" />
                Complete Later
                <span />
              </NavLink>
            )
          ) : null}
        </div>
      </StyledSubHeader>
    );
  }
}

export default SubHeader;
