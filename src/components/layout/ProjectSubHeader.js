import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { NavLink } from "react-router-dom";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import StyledModuleLink from "../../styleComponents/StyledModuleLink";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";

class ProjectSubHeader extends Component {
  render() {
    let { projectId, module, projectWithId } = this.props;
    let form = module ? "ClientModuleForm" : "ClientProjectForm";

    return (
      <StyledSubHeader sidebarCondition projectSubHeader="true">
        {module ? (
          <div className="left moduleSubHeader">
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink to="#">New module</NavLink>
            </StyledModuleLink>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink to={`/dashboard/project/${projectId}`}>
                Project {projectWithId ? projectWithId.name : ""}
              </NavLink>
            </StyledModuleLink>
            <StyledModuleLink className="moduleBreadcrumb">
              <NavLink to="#">Root module</NavLink>
            </StyledModuleLink>
          </div>
        ) : (
          <div className="left" />
        )}
        <div className="right">
          <button
            onClick={() => this.props.dispatch(submit(form))}
            className="saveBtn"
          >
            <StyledSubHeaderLink className="rightLink arrow" />
            Save
            <span />
          </button>

          <SubHeaderLinkWrap
            url={module ? `/dashboard/project/${projectId}` : "/dashboard/"}
            label="Cancel"
            className="rightLink close"
          />
        </div>
      </StyledSubHeader>
    );
  }
}

export default connect(({ projectWithId }) => ({ projectWithId }))(
  ProjectSubHeader
);
