import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { StyledBar } from "../../../styleComponents/layout/SideBar";
import { IMAGE_PORT } from "../../../constans/constans";

class SideBarLeft extends Component {
  render() {
    const { allProjects, currentProject, currentEpic, allEpics } = this.props;

    return (
      <StyledBar className="left">
        <div className="innerWrapper">
          <div className="title">
            <h4>Projects</h4>
          </div>
          <div className={`projects${currentProject ? " opened" : ""}`}>
            {allProjects &&
              allProjects.map((project, key) => (
                <div className="projectWrapper" key={key}>
                  <NavLink
                    className={`projectLink${
                      currentProject == project.id ? " active" : ""
                    }`}
                    to={`/dashboard/project/${project.id}`}
                    key={project.id}
                  >
                    {project.logo.url ? (
                      <img
                        src={IMAGE_PORT + project.logo.url}
                        alt={project.name}
                      />
                    ) : (
                      <span className="projectNoLogo">{project.name[0]}</span>
                    )}

                    <div className="projectName">
                      {project.name}
                      {project.state &&
                        project.state === "draft" && (
                          <span className="projectStatus">(Draft)</span>
                        )}
                    </div>
                  </NavLink>
                  {currentProject == project.id && (
                    <div className="modules">
                      {allEpics && allEpics.length ? (
                        allEpics.map((epic, key) => (
                          <NavLink
                            className={currentEpic == key + 1 ? "active" : ""}
                            to={`/dashboard/project/${project.id}/module/${key +
                              1}`}
                            key={key}
                          >
                            <span className="moduleNumber">{key + 1}.0</span>&nbsp;
                            {epic.name}
                          </NavLink>
                        ))
                      ) : (
                        <p>No modules</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            <NavLink className="projectLink" to="/dashboard/project/new">
              <span className="addProject" />
              <div className="addProject-label">Add project</div>
            </NavLink>
          </div>
        </div>
      </StyledBar>
    );
  }
}

export default connect(
  ({ allProjects, allEpics }) => ({ allProjects, allEpics }),
  {}
)(SideBarLeft);
