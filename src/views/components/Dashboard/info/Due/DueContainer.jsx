import React, { Component } from "react";
import moment from "moment";

import DueTasks from "./DueTasks";
import EtaTasks from "./EtaTasks";

class DueContainer extends Component {
  getTodaysEpics = epics => {
    const start = moment().startOf("day");

    return epics
      ? epics.filter(epic => moment(epic.eta).isSame(start)).length
      : 0;
  };

  assignModuleName = tasks => {
    const { allEpics } = this.props;

    tasks &&
      tasks.forEach(task => {
        let epic = allEpics && allEpics.filter(p => p.id === task.epic_id);

        task["epic_name"] = epic && epic.length > 0 ? epic[0].name : null;
        task["project_id"] =
          epic && epic.length > 0 ? epic[0].project_id : null;
      });

    return tasks;
  };

  render() {
    const { allEpics, getEtaForWeek, tasks } = this.props;

    const epics = allEpics.length;
    const todaysEpics = this.getTodaysEpics(allEpics);

    let weekTasks = getEtaForWeek(tasks);
    weekTasks = this.assignModuleName(weekTasks);
    weekTasks = this.props.assignProjectName(weekTasks);

    return (
      <div className="tasksDue">
        <div>
          <DueTasks allEpics={epics} todaysEpics={todaysEpics} />
          <EtaTasks tasks={weekTasks} />
        </div>
      </div>
    );
  }
}

export default DueContainer;
