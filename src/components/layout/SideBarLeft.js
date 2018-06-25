import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { StyledBar } from "../../styleComponents/layout/SideBar";
import { IMAGE_PORT, CLIENT } from "../../constans/constans";
import { getUserType } from "../../helpers/functions";

class SideBarLeft extends Component {
  render() {
    const { projects } = this.props;

    return (
      <StyledBar className="left">
        <div className="title">
          <h4>Projects</h4>
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
                  {project.epics.map((epic, key) => (
                    <NavLink
                      className="project-epic"
                      to={`/dashboard/project/${project.id}/module/${key + 1}`}
                      key={key}
                    >
                      <span className="module-number">{key + 1}.0</span>&nbsp;
                      {epic.name}
                    </NavLink>
                  ))}
                  {!project.epics.length && (
                    <p className="no-epics">No modules</p>
                  )}
                </div>
              </div>
            ))}
          <div className="title">
            <h4>Projects on drafts</h4>
          </div>
          <div className="projects">
            <br />
          </div>
          {getUserType() === CLIENT && (
            <div className="project-rapper">
              <NavLink className="project-link" to="/dashboard/project/new">
                <span className="add-project" />
                <div className="add-project-label">Add project</div>
              </NavLink>
            </div>
          )}
        </div>
      </StyledBar>
    );
  }
}

export default connect(({ allEpics }) => ({
  allEpics
}))(SideBarLeft);
