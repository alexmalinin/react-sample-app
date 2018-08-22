import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import HeaderBasic from "@components/HeaderBasic";
import SideBarLeft from "@components/SideBarLeft";
import SideBarRight from "@components/SideBarRight";
import Dashboard from "@components/Dashboard/";
import Search from "@components/Search";
import Project from "./project";

import Teams from "./teams";
import About from "./about";

import { ContainerLarge } from "@styled/Containers";
import MainContainer from "@styled/MainContainer";

import { sidebarOperations } from "@ducks/sidebar";
import { getUserData } from "@ducks/user/actions";

import "react-notifications/lib/notifications.css";
import NotFound from "@components/NotFound";

const DashboardLayout = ({ match, sidebar: { opened }, toogleSidebar }) => (
  <div>
    <HeaderBasic match={match} />
    <MainContainer sidebarOpened={opened} sidebarCondition={true}>
      <SideBarLeft />
      <ContainerLarge>
        <Switch>
          <Route exact path={`${match.url}`} component={Dashboard} />
          <Route exact path={`${match.url}/about`} component={About} />
          <Route path={`${match.url}/project`} component={Project} />
          <Route exact path={`${match.url}/search`} component={Search} />
          <Route
            exact
            path={`${match.url}/specialist/:id([0-9]+)`}
            component={About}
          />
          <Route exact path={`${match.url}/teams`} component={Teams} />
          <Route component={NotFound} />
        </Switch>
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
  ...sidebarOperations,
  getUserData
})(DashboardLayout);
