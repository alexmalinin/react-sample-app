import React, { Component } from "react";
import { Container, ContainerLarge } from "../styleComponents/layout/Container";
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
