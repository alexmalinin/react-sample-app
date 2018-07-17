import React from "react";
import { ContainerLarge, Container } from "../styleComponents/layout/Container";
import RenderDashboard from "./layout/RenderDashboard";
import DashboardSubHeader from "./layout/DashboardSubHeader";

export default ({ projects }) => (
  <ContainerLarge>
    <DashboardSubHeader dashboard />
    <Container sidebarCondition dashboardContainer transparent>
      <RenderDashboard projects={projects} />
    </Container>
  </ContainerLarge>
);
