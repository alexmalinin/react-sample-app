import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import ClassNames from "classnames";

import { IMAGE_PORT, CUSTOMER, S_REDGUY } from "@utilities/constants";
// import { oneOfRoles } from "@view/utils/functions";

import StyledSideBar from "@styled/SideBar";

class SideBarLeft extends Component {
  renderCategory = (projects, title, withEpics = false) => {
    const {
      allEpics: { loading, loaded, epics }
    } = this.props;

    const linkClass = ClassNames("project-link", {
      "with-epics": withEpics
    });

    return (
      !!projects.length && (
        <Fragment>
          {title && (
            <div className="title">
              <h4>{title}</h4>
            </div>
          )}
          <div className="projects">
            {projects &&
              projects.map(project => (
                <div className="project-wrapper" key={project.id}>
                  <NavLink
                    className={linkClass}
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
                  {withEpics && (
                    <div className="modules">
                      {loaded &&
                        epics.projectId === project.id &&
                        epics.map((epic, key) => (
                          <NavLink
                            className="project-module"
                            to={`/dashboard/project/${project.id}/module/${key +
                              1}/view`}
                            key={key}
                          >
                            <span className="module-number">
                              {String(key + 1).padStart(2, 0)}.
                            </span>&nbsp;
                            {epic.name}
                          </NavLink>
                        ))}
                      {loaded &&
                        !epics.length && <p className="no-epics">No modules</p>}
                      {loading && <Loader active />}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </Fragment>
      )
    );
  };

  render() {
    const {
      // sortedProjects: { draft, discovery, brief_submissions, reviewed_by_admin }
    } = this.props;

    return (
      <StyledSideBar className="left">
        <div className="title">
          <h4>Projects</h4>
        </div>
        {/* {this.renderCategory(discovery, null, true)}
        {this.renderCategory(
          [...brief_submissions, ...reviewed_by_admin],
          "Projects on review"
        )}
        {this.renderCategory(draft, "Projects on drafts")} */}
        <NavLink
          className="project-link add-project"
          to="/dashboard/project/new"
        >
          <div className="add-project-button" />
          <div className="add-project-label">Add project</div>
        </NavLink>
      </StyledSideBar>
    );
  }
}

export default connect(state => ({
  sortedProjects: state.sortedProjects,
  allEpics: state.allEpics
}))(SideBarLeft);
