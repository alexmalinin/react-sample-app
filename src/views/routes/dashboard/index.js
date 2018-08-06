import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import HeaderBasic from "@components/HeaderBasic";
import Dashboard from "@components/Dashboard";
import SideBarLeft from "@components/SideBarLeft";
import SideBarRight from "@components/SideBarRight";

import { sidebarOperations } from "@ducks/sidebar";

import MainContainer from "@styled/MainContainer";

const DashboardLayout = ({ match, sidebar: { opened }, toogleSidebar }) => {
  const handleSidebar = () => {
    toogleSidebar();
  };

  return (
    <div>
      <HeaderBasic match={match} />
      <MainContainer sidebarOpened={opened} sidebarCondition={true}>
        <SideBarLeft />
        <Route path={`${match.url}`} component={Dashboard} />
        <SideBarRight opened={opened} toggle={handleSidebar} />
      </MainContainer>
    </div>
  );
};

DashboardLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default connect(({ sidebar }) => ({ sidebar }), {
  ...sidebarOperations
})(DashboardLayout);
