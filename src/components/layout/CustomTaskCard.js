import React, { Component } from "react";
import AssignDropdown from "./AssignDropdown";
import PersonTile from "./PersonTile";
import { S_REDGUY } from "../../constans/constans";
import { getUserRole } from "../../helpers/functions";
import EditTaskModal from "../modals/EditTaskModal";

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

  showEditTaskModal = () => {
    const { id, handleEditTask } = this.props;
    handleEditTask(id);
    let open = document.querySelector("#editTask");
    open.click();
  };

  renderTitle = () => {
    const { title } = this.props;

    if (title.length > 70) {
      return title.slice(0, 70) + "...";
    } else return title;
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
      cost,
      deleteTask,
      epic
    } = this.props;

    return (
      <div
        className="dragItem"
        style={{ backgroundColor: "#fff" }}
        onMouseLeave={() => this.setState({ showDropdown: false })}
      >
        <h4 className="title">{this.renderTitle()}</h4>
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
        {!!cost && (
          <div className="line">
            <img src="/images/dollar.png" alt="dollar" />
            <span>${cost}</span>
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
        {getUserRole() === S_REDGUY ? (
          <div className="dropdown">
            <a
              tabIndex="1"
              className="trigger"
              onClick={e => {
                this.setState({ showDropdown: !this.state.showDropdown });
              }}
            >
              ...
            </a>
            {this.state.showDropdown ? (
              <div className="menu">
                <div className="item">
                  <div onClick={this.showEditTaskModal}>Edit</div>
                </div>
                <div className="item">
                  <div onClick={() => deleteTask(epic, id)}>Delete</div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CustomCard;
