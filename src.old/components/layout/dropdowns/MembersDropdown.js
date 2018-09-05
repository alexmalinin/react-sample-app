import React, { Component } from "react";
import PropTypes from "prop-types";
import PersonTile from "../PersonTile";
import { StyledMembersWrapper } from "../../../styleComponents/layout/StyledAssignDropdown";

class MembersDropdown extends Component {
  state = {
    showDropdown: false
  };

  static defaultProps = {
    members: []
  };

  static propTypes = {
    members: PropTypes.array,
    countToShow: PropTypes.number
  };

  handleAssign = (type, id) => {
    const { handleRemove } = this.props;
    handleRemove(type, id);
  };

  openDropdown = e => {
    e.stopPropagation();

    this.setState(
      {
        showDropdown: true
      },
      () => {
        document.addEventListener("click", this.closeDropdown);
      }
    );
  };

  closeDropdown = e => {
    if (this.dropList && !this.dropList.contains(e.target)) {
      this.setState(
        {
          showDropdown: false
        },
        () => {
          document.removeEventListener("click", this.closeDropdown);
        }
      );
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
          2 +
          "px";
      }

      if (
        dropdownRect.height + triggerRect.y + triggerRect.height >
        document.body.clientHeight
      ) {
        this.dropList.style.top = "auto";
        this.dropList.style.bottom = "calc(100% + 4px)";
      }
    }
  }

  render() {
    const { members, countToShow, hideDelete, removeText } = this.props;
    const { showDropdown } = this.state;
    const rest = members.length - countToShow;

    return (
      <StyledMembersWrapper>
        {members.slice(0, countToShow).map((person, index) => {
          return (
            <PersonTile
              key={index}
              specialist={person}
              handleRemove={this.handleAssign}
              removeTitle={removeText}
              hideDelete={hideDelete}
              compressed
            />
          );
        })}
        {rest > 0 && (
          <div className="dropdownWrapper">
            <a
              onClick={this.openDropdown}
              className="allMembers"
              ref={a => (this.trigger = a)}
            >
              {rest}
            </a>
            {showDropdown && (
              <div
                className="membersDropdown"
                ref={div => (this.dropList = div)}
                onClick={e => e.stopPropagation()}
              >
                <h3>Members</h3>
                {members.map((person, index) => {
                  return (
                    <PersonTile
                      key={index}
                      specialist={person}
                      handleRemove={this.handleAssign}
                      removeTitle={removeText}
                      hideDelete={hideDelete}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </StyledMembersWrapper>
    );
  }
}

export default MembersDropdown;
