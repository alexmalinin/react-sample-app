import React, { Component } from "react";
import { StyledBar } from "../../../styleComponents/layout/SideBar";
import { Accordion, Tab } from "semantic-ui-react";

function Teams({ projects }) {
  return (
    <div>
      {projects.map((value, index) => (
        <div className="team-tab-project" key={index}>
          <h4>{value.name} Project</h4>
          <h5>#{value.name} Project Team</h5>
          <div className="persons team">
            {value.team.map(team => (
              <div className="person" key={team}>
                <img src="/images/uploadImg.png" alt="" />
              </div>
            ))}
            <div className="person">
              <span>+</span>
            </div>
          </div>
          {value.subteams.map((subteam, index) => (
            <div className="persons subteams" key={index}>
              <h5>
                #{value.name} Project {subteam.name}
              </h5>
              {subteam.team.map((team, index) => (
                <div className="person" key={index}>
                  <img src="/images/uploadImg.png" alt="person" />
                </div>
              ))}
              <div className="person">
                <span>+</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Activity({ days }) {
  return (
    <div>
      {days.map((day, index) => (
        <div className="activity-tab-item" key={index}>
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

export default class SideBarRight extends Component {
  render() {
    let { projects, days } = this.props;

    const panes = [
      {
        menuItem: "TEAMS",
        render: () => (
          <Tab.Pane>
            <Teams projects={projects} />
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
