import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import AddTaskModal from "../modals/AddTaskModal";
import ProgressBars from "./ProgressBar";
import { Transition } from "semantic-ui-react";
import { S_REDGUY, CUSTOMER, S_ACTIVE, S_CORE } from "../../constants/user";
import { getUserRole, getUserId } from "../../helpers/functions";

class ProjectSubHeader extends Component {
  renderProgressBars = () => {
    const {
      allEpics: { loaded, epics }
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
            url={`/dashboard/project/${this.props.project}/module/${key + 1}`}
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
    const { currentEpic, epicTasks, project, myTasks } = this.props;

    const allTasksCount = epicTasks && epicTasks.length;
    let completedTasksCount = 0,
      myTasksCount = 0;
    epicTasks &&
      epicTasks.forEach(task => {
        (task.state === "done" || task.state === "accepted") &&
          completedTasksCount++;
        task.specialists.some(
          spec => spec.id === getUserId() && myTasksCount++
        );
      });
    const percents = Math.round(completedTasksCount / allTasksCount * 100) || 0;

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
        <Transition
          animation="fade"
          duration={400}
          visible={currentEpic !== "all"}
        >
          <div className="right board-progress-bars">
            {(getUserRole() === S_ACTIVE || getUserRole() === S_CORE) && (
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
                content="Add epic"
                className="addTask"
              />
            )}
            <SubHeaderLinkWrap label="Epics" url="#" className="right-link">
              {`${completedTasksCount}/${allTasksCount}`}
            </SubHeaderLinkWrap>
            <SubHeaderLinkWrap
              label="Module progress"
              url="#"
              className="right-link"
            >
              {percents}%
              <ProgressBars percents={percents} />
            </SubHeaderLinkWrap>
          </div>
        </Transition>
      </StyledSubHeader>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    updateTask: state.updateTask,
    allEpics: state.allEpics
  };
};

export default connect(mapStateToProps)(ProjectSubHeader);
