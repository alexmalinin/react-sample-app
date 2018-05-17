import React, { Component } from "react";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import AddTeamModal from "../modals/AddTeamModal";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

import { CLIENT, S_CORE, S_REDGUY } from "../../constans/constans";
import { getUserRole } from "../../helpers/functions";

class TeamSubHeader extends Component {
  render() {
    const { userType } = this.props;
    return (
      <StyledSubHeader sidebarCondition account>
        <div className="teamSubHeader">
          <SubHeaderLinkWrap
            content="Teams"
            url="/dashboard/teams"
            className="teamLink dv-button__circle"
          >
            &nbsp;
          </SubHeaderLinkWrap>

          {(getUserRole() === S_CORE || getUserRole() === S_REDGUY) && (
            <AddTeamModal />
          )}
        </div>
      </StyledSubHeader>
    );
  }
}

export default TeamSubHeader;
