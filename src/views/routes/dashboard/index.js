import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import EnchancedRoute from "../../utils/hoc/EnchancedRoute";

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
import DeleteConfirmation from "@UI/modals/DeleteConfirmation";

const DashboardLayout = ({
  match,
  sidebar: { opened },
  toogleSidebar,
  confirmModal
}) => {
  return (
    <div>
      <HeaderBasic match={match} />
      <MainContainer sidebarOpened={opened} sidebarCondition={true}>
        <SideBarLeft />
        <ContainerLarge>
          <Switch>
            <EnchancedRoute
              exact
              path={`${match.url}`}
              component={Dashboard}
              title="Dashboard"
            />
            <EnchancedRoute
              exact
              path={`${match.url}/about`}
              component={About}
              title="Your Profile"
            />
            <EnchancedRoute path={`${match.url}/project`} component={Project} />
            <EnchancedRoute
              exact
              path={`${match.url}/search`}
              component={Search}
              title="Search Specialist"
            />
            <EnchancedRoute
              exact
              path={`${match.url}/specialist/:id([0-9]+)`}
              component={About}
            />
            <EnchancedRoute
              exact
              path={`${match.url}/teams`}
              component={Teams}
              title="Teams"
            />
            <Route component={NotFound} />
          </Switch>
        </ContainerLarge>
        <SideBarRight opened={opened} toggle={toogleSidebar} />
      </MainContainer>
      <NotificationContainer />
      <DeleteConfirmation isOpen={!!confirmModal} {...confirmModal} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    sidebar: state.sidebar,
    confirmModal: state.modals.confirmModal
  };
};

export default connect(mapStateToProps, {
  ...sidebarOperations,
  getUserData
})(DashboardLayout);
