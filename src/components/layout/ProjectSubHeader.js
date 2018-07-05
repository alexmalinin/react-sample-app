import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { submit, change } from "redux-form";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import StyledModuleLink from "../../styleComponents/StyledModuleLink";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import { getUserRole } from "../../helpers/functions";
import { S_REDGUY } from "../../constants/user";

class ProjectSubHeader extends Component {
  render() {
    let { projectId, module, loading } = this.props;
    let form = module ? "ClientModuleForm" : "ClientProjectForm";

    return (
      <StyledSubHeader
        sidebarCondition
        // projectSubHeader="true"
        disabled={loading}
      >
        {module ? (
          <div className="left moduleSubHeader">
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink exact to="/dashboard/">
                Dashboard
              </NavLink>
            </StyledModuleLink>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink exact to={`/dashboard/project/${projectId}/module/new`}>
                Create module
              </NavLink>
            </StyledModuleLink>
          </div>
        ) : (
          <div className="left moduleSubHeader">
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink exact to="/dashboard/">
                Dashboard
              </NavLink>
            </StyledModuleLink>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink exact to={`/dashboard/project/new`}>
                Create project
              </NavLink>
            </StyledModuleLink>
          </div>
        )}
        <div className="right" />
      </StyledSubHeader>
    );
  }
}

export default connect(({ projectWithId }) => ({ projectWithId }))(
  ProjectSubHeader
);
