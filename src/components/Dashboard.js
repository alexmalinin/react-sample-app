import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import HeaderBasic from "../components/layout/HeaderBasic";
import { S_MainContainer } from "../styleComponents/layout/S_MainContainer";
import { ContainerLarge, Container } from "../styleComponents/layout/Container";
import SideBarLeft from "../components/specialist/renders/SideBarLeft";
import SideBarRight from "../components/specialist/renders/SideBarRight";
import { projects, days, team } from "../helpers/sidebarDbEmulate";
import RenderDashboard from "./layout/RenderDashboard";
import StyledDashBoard from "../styleComponents/StyledDashBoard";
import DashboardSubHeader from "./layout/DashboardSubHeader";

class Dashboard extends Component {
  render() {
    return (
      <ContainerLarge>
        <DashboardSubHeader dashboard />
        <Container sidebarCondition dashboardContainer>
          <RenderDashboard projects={this.props.projects} />
        </Container>
      </ContainerLarge>
    );
  }
}

export default Dashboard;
