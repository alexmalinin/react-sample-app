import React, { Component } from "react";
import { ContainerLarge, Container } from "../styleComponents/layout/Container";
import RenderDashboard from "./layout/RenderDashboard";
import DashboardSubHeader from "./layout/DashboardSubHeader";

class Dashboard extends Component {
  render() {
    return (
      <ContainerLarge>
        <DashboardSubHeader dashboard />
        <Container sidebarCondition dashboardContainer>
          <RenderDashboard
            projects={this.props.projects}
            history={this.props.history}
          />
        </Container>
      </ContainerLarge>
    );
  }
}

export default Dashboard;
