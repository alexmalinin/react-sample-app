import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Dashboard from "view/components/dashboard";
import Teams from "view/components/dashboard/teams";
import Search from "view/components/dashboard/search";
import About from "view/components/dashboard/about";

import HeaderBasic from "../HeaderBasic";
import { S_MainContainer } from "view/styleComponents/layout/S_MainContainer";
import SideBarLeft from "../SideBarLeft";
import SideBarRight from "../SideBarRight";

import { S_PASSIVE } from "utilities/constants";
import { getCookie, setCookie } from "view/utils/functions";

class DashboardLayout extends Component {
  state = {
    rightSidebarOpened: !!getCookie("rightSidebarOpened") || false
  };

  toggleRightSidebar = e => {
    this.setState({
      rightSidebarOpened: !this.state.rightSidebarOpened
    });
    setCookie(
      "rightSidebarOpened",
      this.state.rightSidebarOpened ? "" : "open",
      1460
    );
  };

  render() {
    const {
      match: { params },
      signIn: { auth }
    } = this.props;

    const { rightSidebarOpened } = this.state;

    const passive = auth.role === S_PASSIVE;

    return (
      <div>
        <HeaderBasic passive={passive} match={this.props.match} page={true} />

        <S_MainContainer
          sidebarOpened={rightSidebarOpened}
          sidebarCondition={true}
          passive={passive}
        >
          {!passive && (
            <SideBarLeft
              currentProject={params.projectId}
              currentEpic={params.moduleId}
              projects={null}
            />
          )}

          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/teams" component={Teams} />
          <Route path="/dashboard/search" component={Search} />
          <Route path="/dashboard/about" component={About} />

          {!passive && (
            <SideBarRight
              opened={rightSidebarOpened}
              toggle={this.toggleRightSidebar}
            />
          )}
        </S_MainContainer>
      </div>
    );
  }
}

export default connect(({ signIn }) => ({ signIn }), {})(DashboardLayout);
