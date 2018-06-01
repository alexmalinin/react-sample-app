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
      <StyledSubHeader sidebarCondition>
        <div className="left">
          <SubHeaderLinkWrap
            label="Teams"
            url="/dashboard/teams"
            className="boldLink teamLink"
          >
            <i className="fas fa-users" />
          </SubHeaderLinkWrap>
        </div>
        <div className="right">
          {(getUserRole() === S_CORE || getUserRole() === S_REDGUY) && (
            <AddTeamModal />
          )}
        </div>
      </StyledSubHeader>
    );
  }
}

export default TeamSubHeader;
