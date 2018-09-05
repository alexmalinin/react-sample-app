import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {
  ContainerLarge,
  Container
} from "view/styleComponents/layout/Container";

import DashboardSubHeader from "view/components/layout/DashboardSubHeader";
import RenderDashboard from "view/components/layout/RenderDashboard";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <ContainerLarge>
          <DashboardSubHeader dashboard />
          <Container sidebarCondition dashboardContainer transparent>
            {/* <RenderDashboard projects={null} /> */}
            dasds
          </Container>
        </ContainerLarge>
      </Fragment>
    );
  }
}

export default Dashboard;
