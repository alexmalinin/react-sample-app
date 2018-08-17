import React from "react";
import { NotificationContainer } from "react-notifications";

import "react-notifications/lib/notifications.css";

import Teams from "@components/Teams";
import TeamSubHeader from "@components/Teams/SubHeader";

import StyledTeamPage from "@styled/TeamPage";
import { Container } from "@styled/Containers";

const TeamsLayout = () => {
  return (
    <StyledTeamPage>
      <TeamSubHeader />
      <Container sidebarCondition>
        <Teams />
      </Container>
      <NotificationContainer />
    </StyledTeamPage>
  );
};

export default TeamsLayout;
