import React, { Component } from "react";
import moment from "moment";
import StyledDashboardCard from "../../../styleComponents/StyledDashboardCard";

class RenderDueTasks extends Component {
  assignModuleName = tasks => {
    const { allEpicsWithoutProject } = this.props;

    tasks &&
      tasks.forEach(task => {
        let epic =
          allEpicsWithoutProject &&
          allEpicsWithoutProject.filter(p => p.id === task.epic_id);

        task["epic_name"] = epic && epic.length > 0 ? epic[0].name : null;
        task["project_id"] =
          epic && epic.length > 0 ? epic[0].project_id : null;
      });

    return tasks;
  };

  rendeDueTask() {
    const { allEpicTasks } = this.props;

    return (
      <StyledDashboardCard size={{ col: 1, row: 1 }} type="task_due">
        <div className="titleWrapper">
          <div className="title">Tasks Due</div>
          <div className="subTitle">Today</div>
        </div>

        <div className="projectContainer">
          <div className="team" />
          <div className="progress">
            <div className="progressItem disabled">
              <div className="progressCount">
                {allEpicTasks ? allEpicTasks.length : 0}
              </div>
              <span>All Epics</span>
            </div>
          </div>
        </div>
      </StyledDashboardCard>
    );
  }

  renderEtaTasks() {
    const { allEpicTasks, getEtaForWeek } = this.props;
    let tasks = getEtaForWeek(allEpicTasks);

    tasks = this.assignModuleName(tasks);
    tasks = this.props.assignProjectName(tasks);

    return (
      <StyledDashboardCard
        size={{ col: 1, row: 4 }}
        justifyContentStart="true"
        type="task_due"
        titleMargin="true"
      >
        <div className="titleWrapper">
          <div className="title">Tasks Due</div>
          <div className="subTitle">This week</div>
        </div>

        <div className="days">
          {tasks.map((task, index) => {
            let etaDay = tasks[index - 1] ? tasks[index - 1].eta : null;

            return (
              <div className="day" key={index}>
                <p className="dayTitle">
                  {task.eta !== etaDay
                    ? moment(task.eta).calendar(null, {
                        lastDay: "[Yesterday]",
                        sameDay: "[Today]",
                        nextDay: "[Tomorrow]",
                        nextWeek: "dddd",
                        sameElse: "L"
                      })
                    : null}
                </p>
                <div className="tasksContainer">
                  <div className="taskDescription">{task.name}</div>
                  <div className="taskInfo">{`${task.project_name}  >  ${
                    task.epic_name
                  }`}</div>
                </div>
              </div>
            );
          })}
        </div>
      </StyledDashboardCard>
    );
  }

  render() {
    return (
      <div className="tasksDue">
        <div>
          {this.rendeDueTask()}
          {this.renderEtaTasks()}
        </div>
      </div>
    );
  }
}

export default RenderDueTasks;
