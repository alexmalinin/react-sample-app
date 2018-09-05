import React from "react";
import { NavLink } from "react-router-dom";

import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import StyledModuleLink from "../../styleComponents/StyledModuleLink";

export default ({ projectId, module, loading }) => (
  <StyledSubHeader sidebarCondition disabled={loading}>
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
