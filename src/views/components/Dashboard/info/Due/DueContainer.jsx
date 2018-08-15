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
    const { allEpics, getEtaForWeek } = this.props;

    const epics = allEpics.length;
    const todaysEpics = this.getTodaysEpics(allEpics);

    return (
      <div className="tasksDue">
        <div>
          <DueTasks allEpics={epics} todaysEpics={todaysEpics} />
          <EtaTasks />
        </div>
      </div>
    );
  }
}

export default DueContainer;
