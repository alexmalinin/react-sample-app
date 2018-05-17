import React, { Component } from "react";
import AssignDropdown from "./AssignDropdown";
import PersonTile from "./PersonTile";
import { S_REDGUY } from "../../constans/constans";

class CustomCard extends Component {
  state = {
    showDropdown: false
  };

  assignSpeciaist = (type, specId) => {
    const { assignSpecialist, removeSpecialist, id } = this.props;

    if (type === "assign") {
      assignSpecialist(id, specId);
    } else removeSpecialist(id, specId);
  };

  render() {
    const {
      title,
      description,
      id,
      specialists,
      specialistList,
      userType,
      eta,
      cost
    } = this.props;

    return (
      <div className="dragItem" style={{ backgroundColor: "#fff" }}>
        <h4 className="title">{title}</h4>
        {eta && (
          <div className="line">
            <img src="/images/calendar.png" alt="calendar" />
            <span>
              {eta
                .split("-")
                .reverse()
                .join("/")}
            </span>
          </div>
        )}
        {cost && (
          <div className="line">
            <img src="/images/dollar.png" alt="dollar" />
            <span>$20,000</span>
          </div>
        )}
        {/* <div className="line bell-line">
          <span className="bell" />
        </div> */}
        <div className="persons">
          {specialists.map((specialist, key) => (
            <PersonTile
              specialist={specialist}
              key={key}
              handleRemove={this.assignSpeciaist}
              taskId={id}
              removeTitle="task"
              userType={userType}
            />
          ))}
          <AssignDropdown
            specialists={specialists}
            allSpecialists={specialistList}
            handleAssign={this.assignSpeciaist}
            userType={[S_REDGUY]}
            closeOnChange={true}
          />
        </div>
        <span className="ddtw">DDTW-{id}</span>
      </div>
    );
  }
}

export default CustomCard;
