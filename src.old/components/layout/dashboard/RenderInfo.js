import React, { Component } from "react";
import RenderModuleInfo from "./RenderModuleInfo";
import ProgressBars from "../ProgressBar";
import StyledDashboardCard from "../../../styleComponents/StyledDashboardCard";
import { colors } from "../../../styleComponents/constants/colors";

class RenderInfo extends Component {
  getCompletedEpics(array) {
    let completedCount = 0;

    array &&
      array.forEach(item => {
        let allTasks =
            item.tasks && item.tasks.length > 0 ? item.tasks.length : null,
          completed = null;

        completed =
          item.tasks &&
          item.tasks.filter(
            task => task.state === "done" || task.state === "accepted"
          );

        if (allTasks === (completed && completed.length)) {
          completedCount++;
        }
      });

    return completedCount;
  }

  getCompletedTasks(array) {
    let completedCount = 0;
    array &&
      array.forEach(
        item =>
          (item.state === "done" || item.state === "accepted") &&
          completedCount++
      );
    return completedCount;
  }

  renderDone() {
    const { allEpicTasks, getEtaForWeek } = this.props;

    const allTasks = getEtaForWeek(allEpicTasks, true);

    const allTasksCount = allTasks && allTasks.length,
      completedTasks = this.getCompletedTasks(allTasks);

    return (
      <StyledDashboardCard size={{ col: 1, row: 1 }} type="task_due">
        <div className="titleWrapper">
          <div className="title">Epics Done</div>
          <div className="subTitle">This week</div>
        </div>

        <div className="projectContainer info-done">
          <div className="team" />
          <div className="progress">
            <div className="progressItem disabled">
              <div className="progressBar">{`${allTasksCount}/${completedTasks}`}</div>
              <span>All Epics</span>
            </div>
          </div>
        </div>
      </StyledDashboardCard>
    );
  }

  getTasks() {
    const { summary } = this.props;
    let completedTasks = 0;

    summary &&
      summary.forEach(element => {
        for (let key in element) {
          let value = element[key];
          completedTasks += value.completed_tasks;
        }
      });

    return completedTasks;
  }

  getEpics() {
    const { summary } = this.props;
    let completedEpics = 0;

    summary &&
      summary.forEach(element => {
        for (let key in element) {
          let value = element[key];
          completedEpics += value.completed_modules;
        }
      });

    return completedEpics;
  }

  renderCompleted() {
    const completedEpics = this.getEpics(),
      completedTasks = this.getTasks();

    return (
      <StyledDashboardCard size={{ col: 1, row: 1 }}>
        <div className="titleWrapper">
          <div>
            <p>Completed</p>
          </div>
        </div>

        <div className="projectContainer info-completed">
          <div className="team" />
          <div className="progress">
            <div className="progressItem">
              <div className="progressBar">{completedTasks}</div>
              <ProgressBars percents={100} strokeColor={colors.blue} />
              <span>Epics</span>
            </div>
            <div className="progressItem">
              <div className="progressBar">{completedEpics}</div>
              <ProgressBars percents={100} strokeColor={colors.blue} />
              <span>Modules</span>
            </div>
            <div className="progressItem">
              <div className="progressBar">0</div>
              <ProgressBars percents={100} strokeColor={colors.blue} />
              <span>Projects</span>
            </div>
          </div>
        </div>
      </StyledDashboardCard>
    );
  }

  render() {
    const { allEpicsWithoutProject, getEtaForWeek } = this.props;

    let allEpics = getEtaForWeek(allEpicsWithoutProject);
    allEpics = this.props.assignProjectName(allEpics);

    allEpics = allEpics.length >= 6 ? allEpics.slice(0, 6) : allEpics;

    return (
      <div className="tasks">
        <div>
          {this.renderDone()}
          {this.renderCompleted()}
          {allEpics &&
            allEpics.map((epic, index) => (
              <RenderModuleInfo
                key={index}
                epic={epic}
                getCompletedTasks={this.getCompletedTasks}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default RenderInfo;
