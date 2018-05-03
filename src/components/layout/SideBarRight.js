import React, { Component } from "react";
import { StyledBar } from "../../styleComponents/layout/SideBar";
import { Tab } from "semantic-ui-react";
import Teams from "../Teams";

class SideBarRight extends Component {
  render() {
    let { days, teams } = this.props;

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
            <Activity days={days} />
          </Tab.Pane>
        )
      }
    ];

    return (
      <StyledBar className="right">
        <Tab panes={panes} />
      </StyledBar>
    );
  }
}

function Activity({ days }) {
  return (
    <div>
      {days.map((day, index) => (
        <div className="activity-tab-item">
          <h4>{day.day}</h4>
          {day.activity.map((value, index) => (
            <div className="activity-item" key={index}>
              <h5>{value.time}</h5>
              <div className="person">
                <img src="/images/uploadImg.png" alt="" />
              </div>
              <div className="text">
                <span>{value.action}</span> <br />
                <span>{value.project}</span> <br />
                <span>{value.description}</span> <br />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SideBarRight;
