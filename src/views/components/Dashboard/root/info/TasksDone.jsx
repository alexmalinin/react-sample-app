import React from "react";

import StyledDashboardCard from "./StyledDashboardCard";

function TasksDone() {
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
            {/* <div className="progressBar">{`${allTasksCount}/${completedTasks}`}</div> */}
            <span>All Epics</span>
          </div>
        </div>
      </div>
    </StyledDashboardCard>
  );
}

export default TasksDone;
