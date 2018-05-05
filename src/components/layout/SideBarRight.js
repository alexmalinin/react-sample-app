import React, { Component } from "react";
import { StyledBar } from "../../styleComponents/layout/SideBar";
import { Tab } from "semantic-ui-react";
import Teams from "../Teams";

class SideBarRight extends Component {
  state = {
    opened: false
  };

  toggle = e => {
    this.setState({
      opened: !this.state.opened
    });
  };

  render() {
    let { days, teams } = this.props;
    const { opened } = this.state;
    // console.log(opened);

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
      <StyledBar
        className={`right${opened ? " open" : ""}`}
        ref={bar => (this.sideBar = bar)}
        // tabIndex="-1"
        // onFocus={this.open}
        // onBlur={this.close}
      >
        <button
          className="trigger"
          ref={button => (this.toggleBtn = button)}
          onClick={this.toggle}
          // onFocus={e => e.stopPropagation()}
          // onBlur={e => e.stopPropagation()}
        />
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
