import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Dashboard from "@components/Dashboard/";
import Search from "@components/Search";
import HeaderBasic from "@components/HeaderBasic";
import SideBarLeft from "@components/SideBarLeft";
import SideBarRight from "@components/SideBarRight";

import { ContainerLarge } from "@styled/Containers";

import { sidebarOperations } from "@ducks/sidebar";

import MainContainer from "@styled/MainContainer";

const DashboardLayout = ({ match, sidebar: { opened }, toogleSidebar }) => (
  <div>
    <HeaderBasic match={match} />
    <MainContainer sidebarOpened={opened} sidebarCondition={true}>
      <SideBarLeft />
      <ContainerLarge>
        <Route exact path={`${match.url}`} component={Dashboard} />
        <Route exact path={`${match.url}/search`} component={Search} />
      </ContainerLarge>
      <SideBarRight opened={opened} toggle={() => toogleSidebar()} />
    </MainContainer>
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
