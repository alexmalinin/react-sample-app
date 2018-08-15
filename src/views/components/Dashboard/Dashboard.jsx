import React from "react";

import DueInfo from "./info/Due";
import ProjectsInfo from "./info/Projects";
import TasksInfo from "./info/Tasks";

import DashboardSubHeader from "./DashboardSubHeader";
import { Container } from "@styled/Containers";

import StyledDashboard from "./StyledDashboard";

const Dashboard = ({
  projects,
  allEpics,
  summary,
  getEtaForWeek,
  assignProjectName
}) => (
  <Container sidebarCondition dashboardContainer transparent>
    <DashboardSubHeader dashboard />
    <StyledDashboard>
      <DueInfo allEpics={allEpics} getEtaForWeek={getEtaForWeek} />
      <ProjectsInfo summary={summary} projects={projects} />
      <TasksInfo
        summary={summary}
        allEpics={allEpics}
        getEtaForWeek={getEtaForWeek}
        assignProjectName={assignProjectName}
      />
    </StyledDashboard>
  </Container>
);

export default Dashboard;
