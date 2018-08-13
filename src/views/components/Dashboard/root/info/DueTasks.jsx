import React from "react";

import StyledDashboardCard from "./StyledDashboardCard";

const DueTasks = () => {
  return (
    <StyledDashboardCard size={{ col: 1, row: 1 }} type="task_due">
      <div className="titleWrapper">
        <div className="title">Epics Due</div>
        <div className="subTitle">Today</div>
      </div>

      <div className="projectContainer">
        <div className="team" />
        <div className="progress">
          <div className="progressItem disabled">
            <div className="progressCount">
              {/* {allEpicTasks ? allEpicTasks.length : 0} */}
            </div>
            <span>All Epics</span>
          </div>
          <div className="progressItem">
            <div className="progressCount">
              {/* {todaysEpics ? todaysEpics.length : 0} */}
            </div>
            <span>Epics</span>
          </div>
        </div>
      </div>
    </StyledDashboardCard>
  );
};

export default DueTasks;
