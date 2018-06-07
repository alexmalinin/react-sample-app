import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import { StyledAssignDropdown } from "../../styleComponents/layout/StyledAssignDropdown";
import { IMAGE_PORT, S_REDGUY } from "../../constans/constans";
import { getUserRole } from "../../helpers/functions";

export default class AssignTeamDropdown extends Component {
  state = {
    options: [],
    assignedIds: [],
    showDropdown: false,
    showDeleteConfirmation: false
  };

  //Assign custom teams dropdown

  openDropdown = e => {
    e.stopPropagation();
    let assignedIds = [];
    this.props.specialists.forEach(spec => assignedIds.push(spec.id));
    this.setState({
      options: this.props.allTeams,
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
        showDropdown: false,
        fetch: false
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

      if (
        320 + triggerRect.y + triggerRect.height >
        document.body.clientHeight
      ) {
        this.dropList.style.top = "auto";
        this.dropList.style.bottom = "calc(100% + 4px)";
      }
    }
  }

  handleSearch = (e, data) => {
    if (data.value != "") {
      let result = [];
      this.state.options.forEach(team => {
        let name = team.name;
        if (
          name.toLocaleLowerCase().indexOf(data.value.toLocaleLowerCase()) >= 0
        ) {
          result.push(team);
        }
      });
      this.setState({
        options: result
      });
    } else
      this.setState({
        options: this.props.allTeams
      });
  };

  handleAssignTeam = e => {
    const teamId = e.target.getAttribute("data");
    let type;

    if (e.target.className === "assigned") {
      type = "remove";
    } else type = "assign";

    this.props.handleAssignTeam(teamId);

    this.props.closeOnChange && this.closeDropdown();
  };

  render() {
    const { label, renderToDashboard, renderToModal, userType } = this.props;
    const { options, assignedIds, showDropdown } = this.state;
    const renderCondition = userType.some(type => type === getUserRole());

    return (
      renderCondition && (
        <StyledAssignDropdown
          renderToModal={renderToModal}
          // tabIndex="-1"
        >
          <a
            tabIndex="1"
            onClick={this.openDropdown}
            ref={a => (this.trigger = a)}
          >
            <span className="plus">+</span>
            {(renderToDashboard || renderToModal) && (
              <span className="label">{label}</span>
            )}
          </a>
          {showDropdown && (
            <div
              className={`dropdown${showDropdown ? " visible" : ""}`}
              ref={div => (this.dropList = div)}
              onClick={e => e.stopPropagation()}
            >
              <div className="close" onClick={this.closeDropdown} />
              <p className="dropdownTitle">Teams</p>
              <Input
                type="text"
                placeholder="Search teams"
                name="searchSpec"
                ref={input => (this.searchInput = input)}
                onClick={e => e.target.focus()}
                onBlur={this.closeDropdown}
                onChange={this.handleSearch}
              />
              <div className="dropdown-list">
                {options &&
                  options.map((team, key) => (
                    <div
                      key={key}
                      data={team.id}
                      onClick={this.handleAssignTeam}
                      className={
                        assignedIds.indexOf(team.id) >= 0 ? "assigned" : ""
                      }
                    >
                      {/* <img
                        data={specialist.id}
                        src={
                          specialist.avatar.url
                            ? IMAGE_PORT + specialist.avatar.url
                            : "/images/uploadImg.png"
                        }
                        alt="member"
                      /> */}
                      {team.name}
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
