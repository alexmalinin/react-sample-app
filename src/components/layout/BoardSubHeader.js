import React, { Component } from "react";
import { connect } from "react-redux";
import ClassNames from "classnames";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import AddTaskModal from "../modals/AddTaskModal";
import ProgressBars from "./ProgressBar";
import { S_REDGUY, CUSTOMER, S_ACTIVE, S_CORE } from "../../constants/user";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import { getUserRole, oneOfRoles, getUserId } from "../../helpers/functions";

class ProjectSubHeader extends Component {
  renderProgressBars = () => {
    const {
      allEpics: { loaded, epics },
      status
    } = this.props;

    return (
      loaded &&
      epics.map((epic, key) => {
        let subheaderCompletedTasks = 0;
        epic.tasks.forEach(
          task =>
            (task.state === "done" || task.state === "accepted") &&
            subheaderCompletedTasks++
        );
        return (
          <SubHeaderLinkWrap
            key={key}
            url={`/dashboard/project/${this.props.project}/module/${epic.id}/${
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
      currentEpic,
      epicTasks: { loaded, tasks, loading },
      project,
      myTasks,
      status
    } = this.props;

    const allTasksCount = tasks.length;
    let completedTasksCount = 0,
      myTasksCount = 0;
    loaded &&
      tasks.forEach(task => {
        (task.state === "done" || task.state === "accepted") &&
          completedTasksCount++;
        task.specialists.some(
          spec => spec.id === getUserId() && myTasksCount++
        );
      });
    const percents = Math.round(completedTasksCount / allTasksCount * 100) || 0;

    const rightBarsClass = ClassNames("right", "board-progress-bars", {
      fade: currentEpic === "all" || !loaded
    });

    return (
      <StyledSubHeader sidebarCondition profile="true">
        <div className="left kanbanSubHeader">
          <SubHeaderLinkWrap
            label={<span>&nbsp;</span>}
            url={`/dashboard/project/${this.props.project}`}
            className="allModules"
          >
            <span>All</span>
          </SubHeaderLinkWrap>

          {this.renderProgressBars()}
          {(getUserRole() === CUSTOMER || getUserRole() === S_REDGUY) && (
            <SubHeaderLinkWrap
              label="Add module"
              url={`/dashboard/project/${this.props.project}/module/new`}
              className="addButton"
            />
          )}
        </div>
        <div className={rightBarsClass}>
          {(getUserRole() === S_ACTIVE || getUserRole() === S_CORE) &&
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
          {getUserRole() === S_REDGUY && (
            <AddTaskModal
              epic={currentEpic}
              project={project}
              className="addTask"
              trigger={
                <a className="button add-epic">
                  <StyledSubHeaderLink className="right-link addButton modalTrigger" />
                  <span>Add epic</span>
                </a>
              }
            />
          )}

          {oneOfRoles(S_ACTIVE, S_CORE, S_REDGUY) &&
            status === "view" && (
              <SubHeaderLinkWrap
                label="edit"
                url={`/dashboard/project/${
                  this.props.project
                }/module/${currentEpic}/edit`}
                className="boldLink"
              >
                <i className="fas fa-pencil-alt small" />
              </SubHeaderLinkWrap>
            )}

          {oneOfRoles(S_ACTIVE, S_CORE, S_REDGUY) &&
            status === "edit" && (
              <SubHeaderLinkWrap
                label="view"
                url={`/dashboard/project/${
                  this.props.project
                }/module/${currentEpic}/view`}
                className="boldLink"
              >
                <i className="far fa-eye small" />
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
  return {
    updateTask: state.updateTask,
    allEpics: state.allEpics,
    epicTasks: state.epicTasks
  };
};

export default connect(mapStateToProps)(ProjectSubHeader);
