import React, { Component } from "react";
import AssignDropdown from "./AssignDropdown";
import PersonTile from "./PersonTile";
import { S_REDGUY, S_ACTIVE, S_CORE } from "../../constans/constans";
import { getUserRole, oneOfRoles } from "../../helpers/functions";
import EditTaskModal from "../modals/EditTaskModal";
import { formatCurrency } from "../../helpers/validate";
import MembersDropdown from "./dropdowns/MembersDropdown";

const defaultProps = {
  specialists: []
};

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

  // renderTitle = () => {
  //   const { title } = this.props;

  //   if (title.length > 70) {
  //     return title.slice(0, 70) + "...";
  //   } else return title;
  // };

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
      epic,
      specialistCosts
    } = this.props;

    return (
      <div
        className="dragItem"
        style={{ backgroundColor: "#fff" }}
        onMouseLeave={() => this.setState({ showDropdown: false })}
      >
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
        {getUserRole() === S_REDGUY &&
          !!cost && (
            <div className="line">
              <img src="/images/dollar.png" alt="dollar" />
              <span>{formatCurrency(cost)}</span>
            </div>
          )}

        {oneOfRoles(S_ACTIVE, S_CORE) &&
          !!specialistCosts && (
            <div className="line">
              <img src="/images/dollar.png" alt="dollar" />
              <span>{formatCurrency(specialistCosts)}</span>
            </div>
          )}

        <div className="persons">
          <MembersDropdown
            members={specialists}
            countToShow={3}
            position="bottom left"
            handleRemove={this.assignSpeciaist}
            removeText="epic"
          />
          <AssignDropdown
            specialists={specialists}
            allSpecialists={specialistList.filter(spec => spec.role !== S_REDGUY)}
            handleAssign={this.assignSpeciaist}
            userType={[S_REDGUY]}
            closeOnChange={true}
            blue
          />
        </div>
        <span className="ddtw">DDTW-{id}</span>
        {getUserRole() === S_REDGUY ? (
          <div className="dropdown">
            <a
              tabIndex="1"
              className="trigger"
              onClick={e => {
                e.stopPropagation();
                this.setState({ showDropdown: !this.state.showDropdown });
              }}
            >
              ...
            </a>
            {this.state.showDropdown ? (
              <div className="menu" onClick={e => e.stopPropagation()}>
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

CustomCard.defaultProps = defaultProps;

export default CustomCard;
