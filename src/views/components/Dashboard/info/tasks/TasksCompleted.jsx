import React from "react";

import StyledDashboardCard from "../StyledDashboardCard";
import ProgressBar from "@UI/ProgressBar";

import { colors } from "@styled/constants/colors";

const TasksCompleted = () => {
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
            {/* <div className="progressBar">{completedTasks}</div> */}
            <div className="progressBar">5</div>
            <ProgressBar percents={100} strokeColor={colors.blue} />
            <span>Epics</span>
          </div>
          <div className="progressItem">
            {/* <div className="progressBar">{completedEpics}</div> */}
            <div className="progressBar">3</div>
            <ProgressBar percents={100} strokeColor={colors.blue} />
            <span>Modules</span>
          </div>
          <div className="progressItem">
            <div className="progressBar">0</div>
            <ProgressBar percents={100} strokeColor={colors.blue} />
            <span>Projects</span>
          </div>
        </div>
      </div>
    </StyledDashboardCard>
  );
};

export default TasksCompleted;
