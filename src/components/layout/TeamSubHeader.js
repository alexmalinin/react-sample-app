import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import AddTeamModal from "../modals/AddTeamModal";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import { createCustomTeam } from "../../actions/actions";
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
            <AddTeamModal submit={this.submit} />
          )}
        </div>
      </StyledSubHeader>
    );
  }

  submit = data => {
    const { specialistId } = this.props;

    let close = document.querySelector("i.close.icon");
    let { createCustomTeam } = this.props;
    close.click();
    createCustomTeam(data, specialistId);
  };
}

export default connect(({}) => ({}), {
  createCustomTeam
})(TeamSubHeader);
// export default TeamSubHeader;
