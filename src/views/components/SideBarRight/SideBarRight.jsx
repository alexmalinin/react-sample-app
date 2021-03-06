import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import classNames from "classnames";

import Teams from "../Teams";
import StyledSideBar from "@styled/SideBar";
import StyledTeamPage from "@styled/TeamPage";

class SideBarRight extends Component {
  render() {
    let { opened, toggle } = this.props;

    const panes = [
      {
        menuItem: "TEAMS",
        render: () => (
          <Tab.Pane>
            <StyledTeamPage>
              <div className="team-tab-project">
                <Teams renderToSidebar />
              </div>
            </StyledTeamPage>
          </Tab.Pane>
        )
      },
      {
        menuItem: "ACTIVITY",
        render: () => (
          <Tab.Pane>
            <div className="activity-placeholder">
              <p>Coming soon</p>
            </div>
          </Tab.Pane>
        )
      }
    ];

    const sidebarClass = classNames({
      right: true,
      open: opened
    });

    return (
      <StyledSideBar className={sidebarClass}>
        <button
          className="trigger"
          ref={button => (this.toggleBtn = button)}
          onClick={toggle}
        />
        <Tab className="tabs-wrapper" panes={panes} />
      </StyledSideBar>
    );
  }
}

export default SideBarRight;
