import React, { Component } from "react";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import SubHeaderItemWrap from "../forms/renders/SubHeaderItemWrap";
import ProgressBars from "../layout/ProgressBar";
import CompleteLaterModal from "../modals/CompleteLaterModal";
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
          {page !== "profile" ? (
            !this.state.isEditing ? (
              isEdited ? (
                <CompleteLaterModal user={user} page={page} />
              ) : (
                <SubHeaderLinkWrap
                  url="/dashboard/"
                  className="rightLink arrow"
                >
                  Complete Later
                </SubHeaderLinkWrap>
              )
            ) : null
          ) : null}

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
