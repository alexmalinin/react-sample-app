import React, { Component } from "react";
import AssignDropdown from "./AssignDropdown";
import { S_REDGUY, S_ACTIVE, S_CORE } from "../../constants/user";
import { getUserRole, oneOfRoles, getUserId } from "../../helpers/functions";
import { formatCurrency } from "../../helpers/validate";
import MembersDropdown from "./dropdowns/MembersDropdown";

class CustomCard extends Component {
  state = {
    showDropdown: false
  };

  static defaultProps = {
    specialists: []
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

  render() {
    const {
      name,
      id,
      specialists,
      specialistList,
      specialist_tasks,
      eta,
      cost,
      deleteTask,
      epic_id,
      laneId
    } = this.props;

    const specialistCosts = specialist_tasks.find(
      ({ specialist }) => getUserId() === specialist.id
    );

    return (
      <div
        className="dragItem"
        style={{ backgroundColor: "#fff" }}
        onMouseLeave={() => this.setState({ showDropdown: false })}
      >
        <h4 className="title">{name}</h4>
        {eta && (
          <div className="line">
            <i className="fas fa-calendar-alt" />
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
              <i className="fas fa-dollar-sign" />
              <span>{formatCurrency(cost)}</span>
            </div>
          )}

        {oneOfRoles(S_ACTIVE, S_CORE) &&
          !!specialistCosts && (
            <div className="line">
              <i className="fas fa-dollar-sign" />
              <span>{formatCurrency(specialistCosts.cost)}</span>
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
            allSpecialists={specialistList.filter(
              spec => spec.role !== S_REDGUY
            )}
            handleAssign={this.assignSpeciaist}
            userType={[S_REDGUY]}
            closeOnChange={true}
            bordered
          />
        </div>
        {/* <span className="ddtw">DDTW-{id}</span> */}
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
                  <div onClick={() => deleteTask(epic_id, id, laneId)}>
                    Delete
                  </div>
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
