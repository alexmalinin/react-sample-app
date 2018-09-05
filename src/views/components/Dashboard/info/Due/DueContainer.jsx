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

  render() {
    const { allEpics, getEtaForWeek, tasks } = this.props;

    const epics = allEpics.length;
    const todaysEpics = this.getTodaysEpics(allEpics);

    let weekTasks = getEtaForWeek(tasks);
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
