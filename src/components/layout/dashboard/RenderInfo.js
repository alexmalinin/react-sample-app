import React, { Component } from "react";
import ProgressBars from "../ProgressBar";
import StyledDashboardCard from "../../../styleComponents/StyledDashboardCard";

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
    const { type, allEpicTasks, getEtaForWeek } = this.props;

    const allTasks = getEtaForWeek(allEpicTasks);

    const allTasksCount = allTasks && allTasks.length,
      completedTasks = this.getCompletedTasks(allTasks),
      percents = Math.round(completedTasks / allTasksCount * 100) || 0;

    return (
      <StyledDashboardCard size={{ col: 1, row: 1 }} type="task_due">
        <div className="titleWrapper">
          <div className="title">Tasks Done</div>
          <div className="subTitle">This week</div>
        </div>

        <div className={`projectContainer ${type}`}>
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

  renderCompleted() {
    const { type, allEpicsWithoutProject, allEpicTasks } = this.props;

    const completedEpics = this.getCompletedEpics(allEpicsWithoutProject);
    const completedTasks = this.getCompletedTasks(allEpicTasks);

    return (
      <StyledDashboardCard size={{ col: 1, row: 1 }}>
        <div className="titleWrapper">
          <div>
            <p>Completed</p>
          </div>
        </div>

        <div className={`projectContainer ${type}`}>
          <div className="team" />
          <div className="progress">
            <div className="progressItem">
              <div className="progressBar">{completedTasks}</div>
              <ProgressBars percents={100} />
              <span>Tasks</span>
            </div>
            <div className="progressItem">
              <div className="progressBar">{completedEpics}</div>
              <ProgressBars percents={100} />
              <span>Modules</span>
            </div>
            <div className="progressItem">
              <div className="progressBar">0</div>
              <ProgressBars percents={100} />
              <span>Projects</span>
            </div>
          </div>
        </div>
      </StyledDashboardCard>
    );
  }

  renderModuleInfo() {
    const { allEpicsWithoutProject, getEtaForWeek } = this.props;

    let allEpics = getEtaForWeek(allEpicsWithoutProject);
    allEpics = this.props.assignProjectName(allEpics);

    allEpics = allEpics.length >= 6 ? allEpics.slice(0, 6) : allEpics;

    return (
      allEpics &&
      allEpics.map((epic, index) => {
        const allTasksCount = epic.tasks && epic.tasks.length,
          completedTasks = this.getCompletedTasks(epic.tasks),
          percents = Math.round(completedTasks / allTasksCount * 100) || 0;

        return (
          <StyledDashboardCard
            size={{ col: 1, row: 1 }}
            background="#00ffc0"
            type="module_info"
            key={index}
          >
            <div className="project">{epic.project_name || "Unnamed"}</div>

            <div className="projectContainer centered">
              <div className="progress">
                <div className="progressItem">
                  <div className="progressBar">{allTasksCount}</div>
                  <ProgressBars percents={percents} strokeColor="#000" />
                  <span>{epic.name}</span>
                </div>
              </div>
            </div>
          </StyledDashboardCard>
        );
      })
    );
  }

  render() {
    return (
      <div className="tasks">
        <div>
          {this.renderDone()}
          {this.renderCompleted()}
          {this.renderModuleInfo()}
        </div>
      </div>
    );
  }
}

export default RenderInfo;
