import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ClassNames from "classnames";

import SubHeaderLinkWrap from "@UI/SubHeaderLink";
import AddTaskModal from "@UI/modals/AddTask";
import ProgressBars from "@UI/ProgressBar";

import StyledSubHeader from "@styled/SubHeader";
import StyledSubHeaderLink from "@styled/SubHeaderLink";

import { S_REDGUY, CUSTOMER, S_ACTIVE, S_CORE } from "@utilities";
import { oneOfRoles } from "@views/utils/functions";

class ProjectSubHeader extends Component {
  static defaultProps = {
    epics: [],
    tasks: []
  };

  renderProgressBars = () => {
    const {
      epics,
      tasks,
      match: {
        params: { status, projectId }
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
        params: { projectId, num: moduleId, status }
      },
      tasks,
      myTasks,
      userRole
    } = this.props;

    const tasksCount = tasks.length;

    let completedTasksCount = 0,
      myTasksCount = 0;
    // loaded &&
    //   tasks.forEach(task => {
    //     (task.state === "done" || task.state === "accepted") &&
    //       completedTasksCount++;
    //     task.specialists.some(
    //       spec => spec.id === getUserId() && myTasksCount++
    //     );
    //   });
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

          {this.renderProgressBars()}
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
                onClick={this.props.toggleMyTasks}
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
    epics: state.epics
  };
};

export default withRouter(connect(mapStateToProps)(ProjectSubHeader));
