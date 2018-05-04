import React, { Component } from "react";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import AddTeamModal from "../modals/AddTeamModal";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

import { CLIENT } from "../../constans/constans";

class TeamSubHeader extends Component {
  render() {
    const { userType } = this.props;
    return (
      <StyledSubHeader sidebarCondition account>
        <div className="teamSubHeader">
          <SubHeaderLinkWrap content="Teams" url="#" className="teamLink">
            &nbsp;
          </SubHeaderLinkWrap>

          {userType === CLIENT && <AddTeamModal />}
        </div>
      </StyledSubHeader>
    );
  }
}

export default TeamSubHeader;
