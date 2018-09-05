import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ClassNames from "classnames";
import pathToRegexp from "path-to-regexp";

import SubHeaderLinkWrap from "@UI/SubHeaderLink";
import AddTaskModal from "@UI/modals/AddTask";
import ProgressBars from "@UI/ProgressBar";

import StyledSubHeader from "@styled/SubHeader";
import StyledSubHeaderLink from "@styled/SubHeaderLink";

import { toggleMyTasks } from "@ducks/kanban/actions";

import { S_REDGUY, CUSTOMER, S_ACTIVE, S_CORE } from "@utilities";
import { oneOfRoles } from "@views/utils/functions";

class ProjectSubHeader extends Component {
  static defaultProps = {
    epics: [],
    tasks: []
  };

  renderProgressBars = status => {
    const {
      epics,
      match: {
        params: { projectId }
      }
    } = this.props;

    if (epics.loaded)
      return epics.allIds.map((id, key) => {
        const epic = epics.byId[id];
        const { tasks } = epics.byId[id];

        let subheaderCompletedTasks = 0;

        tasks.forEach(
          task =>
            (task.state === "done" || task.state === "accepted") &&
            subheaderCompletedTasks++
        );

        return (
          <SubHeaderLinkWrap
            key={id}
            url={`/dashboard/project/${projectId}/module/${key + 1}/${
              status ? status : "view"
            }`}
            className="module"
          >
            {key + 1}
            <ProgressBars
              percents={
                !!tasks.length
                  ? subheaderCompletedTasks / epic.tasks.length * 100
                  : 0
              }
            />
          </SubHeaderLinkWrap>
        );
      });
  };

  render() {
    const {
      match: {
        params: { projectId }
      },
      location: { pathname },
      kanban: { myTasks },
      tasks: { loaded, allIds, byId },
      toggleMyTasks,
      userRole,
      userId
    } = this.props;

    const re = pathToRegexp(
      "/dashboard/project/:projectId/module/:num/:status"
    );

    const res = re.exec(pathname) || [];
    const moduleId = res[2];
    const status = res[3];
    const tasksCount = allIds.length;

    let completedTasksCount = 0,
      myTasksCount = 0;
    loaded &&
      allIds.forEach(id => {
        (byId[id].state === "done" || byId[id].state === "accepted") &&
          completedTasksCount++;
        byId[id].specialists.some(spec => spec.id === userId && myTasksCount++);
      });
    const percents = Math.round(completedTasksCount / tasksCount * 100) || 0;

    const rightBarsClass = ClassNames("right", "board-progress-bars", {
      fade: !moduleId
    });

    return (
      <StyledSubHeader sidebarCondition profile="true">
        <div className="left kanbanSubHeader">
          <SubHeaderLinkWrap
            label={<span>&nbsp;</span>}
            url={`/dashboard/project/${projectId}`}
            className="allModules"
          >
            <span>All</span>
          </SubHeaderLinkWrap>

          {this.renderProgressBars(status)}

          {(userRole === CUSTOMER || userRole === S_REDGUY) && (
            <SubHeaderLinkWrap
              label="Add module"
              url={`/dashboard/project/${projectId}/module/new`}
              className="addButton"
            />
          )}
        </div>

        <div className={rightBarsClass}>
          {(userRole === S_ACTIVE || userRole === S_CORE) &&
            status !== "edit" && (
              <SubHeaderLinkWrap
                label="Assigned to me"
                url="#"
                className={`right-link my-tasks${
                  myTasks ? " active" : " unactive"
                }`}
                onClick={toggleMyTasks}
              >
                {myTasksCount}
              </SubHeaderLinkWrap>
            )}

          {userRole === S_REDGUY && (
            <AddTaskModal
              epic={moduleId}
              project={projectId}
              className="addTask"
              trigger={
                <a className="button add-epic">
                  <StyledSubHeaderLink className="right-link addButton modalTrigger" />
                  <span>Add epic</span>
                </a>
              }
            />
          )}

          {oneOfRoles(userRole, S_ACTIVE, S_CORE, S_REDGUY) &&
            status === "view" && (
              <SubHeaderLinkWrap
                label="Info"
                url={`/dashboard/project/${projectId}/module/${moduleId}/edit`}
                className="boldLink"
              >
                <i className="fas fa-eye small" />
              </SubHeaderLinkWrap>
            )}

          {oneOfRoles(userRole, S_ACTIVE, S_CORE, S_REDGUY) &&
            status === "edit" && (
              <SubHeaderLinkWrap
                label="Board"
                url={`/dashboard/project/${projectId}/module/${moduleId}/view`}
                className="boldLink"
              >
                <i className="fas fa-tasks small" />
              </SubHeaderLinkWrap>
            )}

          <SubHeaderLinkWrap label="Epics" url="#" className="right-link">
            {`${completedTasksCount}/${tasksCount}`}
          </SubHeaderLinkWrap>
          <SubHeaderLinkWrap label="Progress" url="#" className="right-link">
            {percents}%
            <ProgressBars percents={percents} />
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userRole: state.user.role,
    userId: state.user.id,
    epics: state.epics,
    tasks: state.tasks,
    kanban: state.kanban
  };
};

const mapDispatchToProps = {
  toggleMyTasks
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectSubHeader)
);
