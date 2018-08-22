import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ClassNames from "classnames";

import SubHeaderLinkWrap from "@UI/SubHeaderLink";

import StyledSubHeader from "@styled/SubHeader";

// import AddTaskModal from "../modals/AddTaskModal";
import ProgressBars from "@UI/ProgressBar";

// import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";

import { S_REDGUY, CUSTOMER, S_ACTIVE, S_CORE } from "@utilities";
import { getUserRole, oneOfRoles, getUserId } from "@views/utils/functions";

class ProjectSubHeader extends Component {
  renderProgressBars = () => {
    const {
      allEpics,
      match: {
        params: { status, projectId }
      }
    } = this.props;

    return (
      allEpics &&
      Object.keys(allEpics).map((epic, key) => {
        let subheaderCompletedTasks = 0;
        allEpics[epic].tasks.forEach(
          task =>
            (task.state === "done" || task.state === "accepted") &&
            subheaderCompletedTasks++
        );
        return (
          <SubHeaderLinkWrap
            key={key}
            url={`/dashboard/project/${projectId}/module/${key + 1}/${
              status ? status : "view"
            }`}
            className="module"
          >
            {key + 1}
            <ProgressBars
              percents={
                !!epic.tasks.length
                  ? subheaderCompletedTasks / epic.tasks.length * 100
                  : 0
              }
            />
          </SubHeaderLinkWrap>
        );
      })
    );
  };

  render() {
    const {
      match: {
        params: { projectId, moduleId, status }
      },
      allTasks,
      myTasks,
      userRole
    } = this.props;

    const allTasksCount = allTasks.length;

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
    const percents = Math.round(completedTasksCount / allTasksCount * 100) || 0;

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
          {/* {getUserRole() === S_REDGUY && (
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
          )} */}

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
            {`${completedTasksCount}/${allTasksCount}`}
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

const mapStateToProps = state => {
  const {
    epicsReducer: { epics },
    tasksReducer: { tasks }
  } = state;

  return {
    userRole: state.user.role,
    updateTask: state.updateTask,
    allEpics: epics,
    allTasks: tasks
  };
};

export default withRouter(connect(mapStateToProps)(ProjectSubHeader));
