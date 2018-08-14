import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import AddTeamModal from "../../common/modals/AddTeamModal";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import { createCustomTeam } from "../../actions/actions";
import { CLIENT, S_CORE, S_REDGUY } from "../../constants/user";
import { getUserRole } from "../../helpers/functions";

const TeamSubHeader = () => (
  <StyledSubHeader>
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
      <AddTeamModal />
    </div>
  </StyledSubHeader>
);

export default TeamSubHeader;
