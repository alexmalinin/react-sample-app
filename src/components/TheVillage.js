import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import HeaderBasic from "../components/layout/HeaderBasic";
import { S_MainContainer } from "../styleComponents/layout/S_MainContainer";
import { Container, ContainerLarge } from "../styleComponents/layout/Container";
import SideBarLeft from "../components/specialist/renders/SideBarLeft";
import SideBarRight from "../components/specialist/renders/SideBarRight";
import { projects, days, team } from "../helpers/sidebarDbEmulate";
import RenderDashboard from "./layout/RenderDashboard";
import StyledDashBoard from "../styleComponents/StyledDashBoard";
import DashboardSubHeader from "./layout/DashboardSubHeader";
import RenderVillage from "./layout/RenderVillage";

class TheVillage extends Component {
  render() {
    const data = [
      {
        title: "jobs",
        content: "$2m"
      },
      {
        title: "modules",
        content: "3.5K"
      },
      {
        title: "tasks",
        content: "1m"
      },
      {
        title: "specialists",
        content: "3k"
      }
    ];

    return (
      <ContainerLarge indentTop>
        <DashboardSubHeader theVillage data={data} />
        <Container sidebarCondition dashboardContainer>
          <RenderVillage />
        </Container>
      </ContainerLarge>
    );
  }
}

export default TheVillage;
