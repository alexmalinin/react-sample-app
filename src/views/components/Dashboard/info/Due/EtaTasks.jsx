import React from "react";

import StyledDashboardCard from "../StyledDashboardCard";

const EtaTasks = () => (
  <StyledDashboardCard
    size={{ col: 1, row: 4 }}
    justifyContentStart="true"
    type="task_due"
    titleMargin="true"
  >
    <div className="titleWrapper">
      <div className="title">Epics Due</div>
      <div className="subTitle">This week</div>
    </div>

    <div className="days">
      {/* {tasks.map((task, index) => {
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
            <div className="taskDescription">
              {this.renderDescription(task.name)}
            </div>
            <div className="taskInfo">{`${task.project_name}  >  ${
              task.epic_name
            }`}</div>
          </div>
        </div>
      );
    })} */}
    </div>
  </StyledDashboardCard>
);

export default EtaTasks;
