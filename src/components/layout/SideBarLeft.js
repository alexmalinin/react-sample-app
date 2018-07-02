import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { StyledBar } from "../../styleComponents/layout/SideBar";
import { IMAGE_PORT } from "../../constants/constants";
import { CLIENT } from "../../constants/user";
import { getUserType } from "../../helpers/functions";

class SideBarLeft extends Component {
  renderCategory = (projects, title) => {
    const { allEpics } = this.props;

    return (
      !!projects.length && (
        <div className="category">
          <div className="title">
            <h4>{title}</h4>
          </div>
          <div className="projects">
            {projects &&
              projects.map(project => (
                <div className="project-wrapper" key={project.id}>
                  <NavLink
                    className="project-link"
                    to={`/dashboard/project/${project.id}`}
                    key={project.id}
                  >
                    {project.logo.url ? (
                      <img
                        className="project-logo"
                        src={IMAGE_PORT + project.logo.url}
                        alt={project.name}
                      />
                    ) : (
                      <span className="project-logo no-logo">
                        {project.name[0]}
                      </span>
                    )}

                    <div className="project-name">{project.name}</div>
                  </NavLink>
                  <div className="modules">
                    {allEpics.loaded &&
                      allEpics.projectId === project.id &&
                      allEpics.data.map((epic, key) => (
                        <NavLink
                          className="project-module"
                          to={`/dashboard/project/${project.id}/module/${key +
                            1}`}
                          key={key}
                        >
                          <span className="module-number">{key + 1}.0</span>&nbsp;
                          {epic.name}
                        </NavLink>
                      ))}
                    {allEpics &&
                      !allEpics.length && (
                        <p className="no-epics">No modules</p>
                      )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )
    );
  };

  render() {
    const { sortedProjects } = this.props;
    const { draft = [], discovery = [] } = sortedProjects || {};

    return (
      <StyledBar className="left">
        {this.renderCategory(discovery, "Projects")}
        {this.renderCategory(draft, "Projects on drafts")}
        {getUserType() === CLIENT && (
          <div className="project-wrapper">
            <NavLink className="project-link" to="/dashboard/project/new">
              <span className="add-project" />
              <div className="add-project-label">Add project</div>
            </NavLink>
          </div>
        )}
      </StyledBar>
    );
  }
}

export default connect(state => ({
  allEpics: state.allEpics,
  sortedProjects: state.sortedProjects
}))(SideBarLeft);
