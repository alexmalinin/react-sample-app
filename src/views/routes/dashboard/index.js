import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Dashboard from "@components/Dashboard/";
import Search from "@components/Search";
import HeaderBasic from "@components/HeaderBasic";
import SideBarLeft from "@components/SideBarLeft";
import SideBarRight from "@components/SideBarRight";

import Teams from "./teams";

import { ContainerLarge } from "@styled/Containers";
import MainContainer from "@styled/MainContainer";

import { sidebarOperations } from "@ducks/sidebar";

import "react-notifications/lib/notifications.css";

const DashboardLayout = ({ match, sidebar: { opened }, toogleSidebar }) => (
  <div>
    <HeaderBasic match={match} />
    <MainContainer sidebarOpened={opened} sidebarCondition={true}>
      <SideBarLeft />
      <ContainerLarge>
        <Route exact path={`${match.url}`} component={Dashboard} />
        <Route exact path={`${match.url}/teams`} component={Teams} />
        <Route exact path={`${match.url}/search`} component={Search} />
        <Route exact path={`${match.url}/teams`} component={Teams} />
      </ContainerLarge>
      <SideBarRight opened={opened} toggle={toogleSidebar} />
    </MainContainer>
    <NotificationContainer />
  </div>
);

DashboardLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default connect(({ sidebar }) => ({ sidebar }), {
  ...sidebarOperations
})(DashboardLayout);
