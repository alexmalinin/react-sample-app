import React, { Component } from "react";
import { StyledBar } from "../../styleComponents/layout/SideBar";
import { Tab } from "semantic-ui-react";
import Teams from "../Teams";
import classNames from "classnames";

class SideBarRight extends Component {
  render() {
    let { teams, opened, toggle } = this.props;

    const panes = [
      {
        menuItem: "TEAMS",
        render: () => (
          <Tab.Pane>
            <Teams teams={teams} renderToRightSidebar />
          </Tab.Pane>
        )
      },
      {
        menuItem: "ACTIVITY",
        render: () => (
          <Tab.Pane>
            <p>Coming soon</p>
          </Tab.Pane>
        )
      }
    ];

    const sidebarClass = classNames({
      right: true,
      open: opened
    });

    return (
      <StyledBar className={sidebarClass}>
        <button
          className="trigger"
          ref={button => (this.toggleBtn = button)}
          onClick={toggle}
        />
        <Tab className="tabs-wrapper" panes={panes} />
      </StyledBar>
    );
  }
}

export default SideBarRight;
