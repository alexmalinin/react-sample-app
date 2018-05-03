import React, { Component, Fragment } from "react";
import { StyledBar } from "../../../styleComponents/layout/SideBar";
import { Accordion, Tab } from "semantic-ui-react";
import Teams from "../../Teams";

class SideBarRight extends Component {
  render() {
    let { projects, days, teams } = this.props;

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

function SidebarTeams({ teams }) {
  return (
    <div>
      {teams && teams.length !== 0
        ? teams.map((team, index) => (
            <div className="team-tab-project" key={team.id}>
              <h4>{team.name}</h4>

              {team.channels && team.channels.length !== 0
                ? team.channels.map((channel, index) => (
                    <Fragment key={index}>
                      <h5>#{channel.name}</h5>

                      <div className="persons team">
                        {channel.specialist && channel.specialist.length !== 0
                          ? channel.specialist.map((specialist, index) => (
                              <div
                                key={specialist}
                                className="person"
                                key={team}
                              >
                                <img src="/images/uploadImg.png" alt="" />
                              </div>
                            ))
                          : ""}
                        <div className="person">
                          <span>+</span>
                        </div>
                      </div>
                    </Fragment>
                  ))
                : ""}

              {/* value.subteams.map((subteam, index) =>
                        <div className="persons subteams" key={index}>
                            <h5>#{value.name} Project {subteam.name}</h5>
                            {subteam.team.map((team, index) =>
                                <div className='person' key={index}>
                                    <img src="/images/uploadImg.png" alt="person"/>
                                </div>
                            )}
                            <div className="person"><span>+</span></div>
                        </div>
                    ) */}
            </div>
          ))
        : ""}
    </div>
  );
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
