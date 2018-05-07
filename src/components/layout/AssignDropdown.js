import React, { Component } from "react";
import { Input } from "semantic-ui-react";

import {
  StyledAssignDropdown,
  StyledPersonTile
} from "../../styleComponents/layout/StyledAssignDropdown";

import { IMAGE_PORT, CLIENT, SPECIALIST } from "../../constans/constans";

export class AssignDropdown extends Component {
  state = {
    options: [],
    assignedIds: [],
    showDropdown: false,
    showDeleteConfirmation: false
  };

  //Assign members dropdown

  openDropdown = () => {
    let assignedIds = [];
    this.props.specialists.forEach(spec => assignedIds.push(spec.id));
    this.setState({
      options: this.props.allSpecialists,
      assignedIds,
      showDropdown: true
    });
    setTimeout(() => {
      this.searchInput && this.searchInput.focus();
    }, 10);
  };

  closeDropdown = e => {
    setTimeout(() => {
      this.setState({
        showDropdown: false
      });
    }, 100);
    if (e) {
      e.target.value = "";
    }
  };

  componentDidUpdate() {
    if (this.state.showDropdown) {
      //fix positioning of dropdown
      let dropdownRect = this.dropList.getBoundingClientRect();
      let triggerRect = this.trigger.getBoundingClientRect();
      // console.log(triggerRect);

      if (dropdownRect.width + triggerRect.x > document.body.clientWidth) {
        this.dropList.style.left =
          -dropdownRect.width -
          triggerRect.x +
          document.body.clientWidth -
          15 +
          "px";
      }

      if (dropdownRect.height + triggerRect.y > document.body.clientHeight) {
        this.dropList.style.top = "auto";
        this.dropList.style.bottom = "calc(100% + 4px)";
      }
    }
  }

  handleSearch = (e, data) => {
    if (data.value != "") {
      let result = [];
      this.state.options.forEach(spec => {
        let name = spec.first_name + " " + spec.last_name;
        if (
          name.toLocaleLowerCase().indexOf(data.value.toLocaleLowerCase()) >= 0
        ) {
          result.push(spec);
        }
      });
      this.setState({
        options: result
      });
    } else
      this.setState({
        options: this.props.allSpecialists
      });
  };

  handleAssign = e => {
    const specId = e.target.getAttribute("data");
    let type;

    if (e.target.className === "assigned") {
      type = "remove";
    } else type = "assign";

    this.props.handleAssign(type, specId);

    this.closeDropdown();
  };

  render() {
    const { label, userType, renderToDashboard } = this.props;
    const { options, assignedIds, showDropdown } = this.state;

    return (
      userType === CLIENT && (
        <StyledAssignDropdown>
          <a
            tabIndex="1"
            onClick={this.openDropdown}
            ref={a => (this.trigger = a)}
          >
            <span className="plus">+</span>
            {renderToDashboard && label}
          </a>
          {showDropdown && (
            <div
              className={`dropdown${showDropdown ? " visible" : ""}`}
              ref={div => (this.dropList = div)}
            >
              <div className="close" onClick={this.closeDropdown} />
              <p className="dropdownTitle">Members</p>
              <Input
                type="text"
                placeholder="Search members"
                name="searchSpec"
                ref={input => (this.searchInput = input)}
                onClick={e => e.target.focus()}
                onBlur={this.closeDropdown}
                onChange={this.handleSearch}
              />
              <div className="dropdown-list">
                {options.map((specialist, key) => (
                  <div
                    key={key}
                    data={specialist.id}
                    onClick={this.handleAssign}
                    className={
                      assignedIds.indexOf(specialist.id) >= 0 ? "assigned" : ""
                    }
                  >
                    <img
                      data={specialist.id}
                      src={
                        specialist.avatar.url
                          ? IMAGE_PORT + specialist.avatar.url
                          : "/images/uploadImg.png"
                      }
                      alt="member"
                    />
                    {specialist.first_name + " " + specialist.last_name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </StyledAssignDropdown>
      )
    );
  }
}

export class PersonTile extends Component {
  state = {
    showDropdown: false
  };

  openDropdown = e => {
    this.setState({
      showDropdown: true
    });
  };

  closeDropdown = () => {
    setTimeout(() => {
      this.setState({
        showDropdown: false
      });
    }, 100);
  };

  removeSpecialist = (event, data) => {
    const { handleRemove, specialist } = this.props;
    handleRemove("remove", specialist.id);
    this.closeDropdown();
  };

  render() {
    const {
      specialist,
      labeled,
      removeTitle,
      userType,
      renderToDashboard
    } = this.props;
    const { showDropdown } = this.state;

    return (
      <StyledPersonTile>
        <a tabIndex="1" onClick={this.openDropdown} onBlur={this.closeDropdown}>
          <img
            onClick={e => e.target.parentNode.focus()}
            alt="avatar"
            src={
              specialist.avatar.url
                ? IMAGE_PORT + specialist.avatar.url
                : "/images/uploadImg.png"
            }
          />
          {labeled &&
            renderToDashboard && (
              <p>
                {specialist.first_name} {specialist.last_name}
              </p>
            )}
        </a>
        {showDropdown && (
          <DeleteTile
            specialist={specialist}
            userType={userType}
            removeTitle={removeTitle}
            showDropdown={showDropdown}
            removeSpecialist={this.removeSpecialist}
          />
        )}
      </StyledPersonTile>
    );
  }
}

class DeleteTile extends Component {
  componentDidMount() {
    let deleteRect = this.deleteTile.getBoundingClientRect();

    if (deleteRect.width + deleteRect.left + 10 > document.body.clientWidth) {
      this.deleteTile.style.left =
        -deleteRect.width -
        deleteRect.left +
        document.body.clientWidth -
        15 +
        "px";
    }

    if (deleteRect.height + deleteRect.y > document.body.clientHeight) {
      this.deleteTile.style.top = "auto";
      this.deleteTile.style.bottom = "calc(100% + 4px)";
    }
  }

  render() {
    const {
      specialist,
      userType,
      removeTitle,
      showDropdown,
      removeSpecialist
    } = this.props;
    return (
      <div
        className={`delete${showDropdown ? " show" : ""}`}
        ref={div => (this.deleteTile = div)}
      >
        <div className="close" onClick={this.closeDropdown} />
        <p className="dropdownTitle">Profile</p>
        <div className="info">
          <img
            src={
              specialist.avatar.url
                ? IMAGE_PORT + specialist.avatar.url
                : "/images/uploadImg.png"
            }
            alt="avatar"
          />
          <div>
            <p>{specialist.first_name + " " + specialist.last_name}</p>
            {userType === CLIENT && (
              <button
                data={specialist.id}
                onClick={removeSpecialist}
                className="remove"
              >
                Remove from {removeTitle}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
