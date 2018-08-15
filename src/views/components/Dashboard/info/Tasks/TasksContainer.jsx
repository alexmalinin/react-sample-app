import React, { Component } from "react";
import PropTypes from "prop-types";

import TasksDone from "./TasksDone";
import TasksCompleted from "./TasksCompleted";
import ModuleInfo from "./ModuleInfo";

class TasksContainer extends Component {
  static propTypes = {
    summary: PropTypes.arrayOf(PropTypes.object),
    allEpics: PropTypes.array,
    getEtaForWeek: PropTypes.func.isRequired,
    assignProjectName: PropTypes.func.isRequired
  };

  static defaultProps = {
    summary: [],
    allEpics: []
  };

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

  render() {
    const { allEpics, getEtaForWeek, assignProjectName } = this.props;

    const completedEpics = this.getEpics(),
      completedTasks = this.getTasks();

    let epics = getEtaForWeek(allEpics);
    epics = assignProjectName(epics);

    return (
      <div className="tasks">
        <div>
          <TasksDone />
          <TasksCompleted
            completedEpics={completedEpics}
            completedTasks={completedTasks}
          />
          {epics.map(epic => <ModuleInfo key={epic.id} epic={epic} />)}
        </div>
      </div>
    );
  }
}

export default TasksContainer;
