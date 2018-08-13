import React from "react";

import DueTasks from "./info/DueTasks";
import EtaTasks from "./info/EtaTasks";
import Overview from "./info/Overview";
import TasksDone from "./info/TasksDone";
import TasksCompleted from "./info/TasksCompleted";

import DashboardSubHeader from "./DashboardSubHeader";
import { Container } from "@styled/Containers";

import StyledDashboard from "./StyledDashboard";

const Dashboard = () => (
  <Container sidebarCondition dashboardContainer transparent>
    <DashboardSubHeader dashboard />
    <StyledDashboard>
      <div className="tasksDue">
        <div>
          <DueTasks />
          <EtaTasks />
        </div>
      </div>

      <div className="projects">
        <div>
          <Overview />
        </div>
      </div>

      <div className="tasks">
        <div>
          <TasksDone />
          <TasksCompleted />
        </div>
      </div>
    </StyledDashboard>
  </Container>
);

export default Dashboard;
