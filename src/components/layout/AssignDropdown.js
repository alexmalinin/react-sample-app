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
      this.searchInput.focus();
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
          <a tabIndex="1" onClick={this.openDropdown}>
            <span className="plus">+</span>
            {renderToDashboard && label}
          </a>
          <div className={`dropdown${showDropdown ? " visible" : ""}`}>
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
        </StyledAssignDropdown>
      )
    );
  }
}

export class PersonTile extends Component {
  state = {
    showDropdown: false
  };

  openDropdown = () => {
    this.setState({
      showDropdown: true
    });
    if (true) {
      console.log(this.deleteTile.getBoundingClientRect().top);
    }
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
        <div
          className={`delete${this.state.showDropdown ? " show" : ""}`}
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
                  onClick={this.removeSpecialist}
                  className="remove"
                >
                  Remove from {removeTitle}
                </button>
              )}
            </div>
          </div>
        </div>
      </StyledPersonTile>
    );
  }
}
