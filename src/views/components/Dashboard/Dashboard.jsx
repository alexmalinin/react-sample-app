import React from "react";

import DueTasks from "./info/due/DueTasks";
import EtaTasks from "./info/due/EtaTasks";
import Overview from "./info//projects/Overview";
import TasksDone from "./info/tasks/TasksDone";
import TasksCompleted from "./info/tasks/TasksCompleted";
import ProjectCard from "./info/projects/ProjectCard";

import DashboardSubHeader from "./DashboardSubHeader";
import { Container } from "@styled/Containers";

import StyledDashboard from "./StyledDashboard";

const Dashboard = ({ projects, summary }) => (
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
          <Overview projects={projects} />

          {Object.keys(projects).map(id => {
            let info = null;

            summary &&
              summary.forEach(element => {
                if (element[id]) {
                  info = element[id];
                }
              });

            return (
              <ProjectCard
                key={id}
                data={projects[id]}
                summary={info}
                // getCurrentEpic={this.getCurrentEpic}
              />
            );
          })}
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
