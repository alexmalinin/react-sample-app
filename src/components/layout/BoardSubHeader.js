import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import AddTaskModal from "../modals/AddTaskModal";
import ProgressBars from "./ProgressBar";
import { Transition } from "semantic-ui-react";
import { CLIENT } from "../../constans/constans";

class ProjectSubHeader extends Component {
  render() {
    const {
      epics,
      currentEpic,
      epicTasks,
      changeUserType,
      project
    } = this.props;

    const allTasksCount = epicTasks && epicTasks.length;
    let completedTasksCount = 0;
    epicTasks &&
      epicTasks.forEach(task => task.state === "done" && completedTasksCount++);
    const percents = Math.round(completedTasksCount / allTasksCount * 100) || 0;

    return (
      <StyledSubHeader sidebarCondition profile="true">
        <div>
          <SubHeaderLinkWrap
            content="All"
            url={`/dashboard/project/${this.props.project}`}
            className="allModules"
          />

          {epics &&
            epics.map((epic, key) => {
              let subheaderCompletedTasks = 0;
              epic.tasks.forEach(
                task => task.state === "done" && subheaderCompletedTasks++
              );
              return (
                <SubHeaderLinkWrap
                  key={key}
                  content={key + 1}
                  url={`/dashboard/project/${this.props.project}/module/${key +
                    1}`}
                  className="module"
                >
                  <ProgressBars
                    percents={subheaderCompletedTasks / epic.tasks.length * 100}
                  />
                </SubHeaderLinkWrap>
              );
            })}
          {changeUserType === CLIENT && (
            <SubHeaderLinkWrap
              content=""
              url={`/dashboard/project/${this.props.project}/module/new`}
              className="addButt"
            >
              Add module
            </SubHeaderLinkWrap>
          )}
        </div>
        <Transition
          animation="fade"
          duration={400}
          visible={currentEpic != "all"}
          className="boardProgressBars"
        >
          <div className="boardProgressBars">
            {changeUserType === CLIENT && (
              <AddTaskModal
                epic={currentEpic}
                project={project}
                content="Add task"
              />
            )}
            <SubHeaderLinkWrap
              content={`${completedTasksCount}/${allTasksCount}`}
              url="#"
              className="rightLink"
            >
              <span>Tasks</span>
            </SubHeaderLinkWrap>
            <SubHeaderLinkWrap
              content={`${percents}%`}
              url="#"
              className="rightLink"
            >
              <span>Module progress</span>
              <ProgressBars percents={percents} />
            </SubHeaderLinkWrap>
          </div>
        </Transition>
      </StyledSubHeader>
    );
  }
}

export default connect(
  ({ updateTask, changeUserType }) => ({ updateTask, changeUserType }),
  null
)(ProjectSubHeader);
