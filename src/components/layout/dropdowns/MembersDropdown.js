import React, { Component } from "react";
import PropTypes from "prop-types";
import { Popup } from "semantic-ui-react";
import PersonTile from "../PersonTile";
import { StyledMembersWrapper } from "../../../styleComponents/layout/StyledAssignDropdown";

class MembersDropdown extends Component {
  static defaultProps = {
    members: []
  };

  static propTypes = {
    members: PropTypes.array,
    countToShow: PropTypes.number
  };

  handleAssign = () => {};

  render() {
    const { members, countToShow, position, removeText } = this.props;
    const rest = members.length - countToShow;

    return (
      <StyledMembersWrapper className="outer">
        {members.slice(0, countToShow).map((person, index) => {
          return (
            <PersonTile
              key={index}
              specialist={person}
              handleRemove={this.handleAssign}
              removeTitle={removeText}
              compressed
            />
          );
        })}
        {rest > 0 && (
          <Popup
            on="click"
            position={position}
            basic
            style={{ border: "none" }}
            trigger={
              <a onClick={e => e.stopPropagation()} className="allMembers">
                {rest}
              </a>
            }
          >
            <StyledMembersWrapper className="inner">
              <h3>Members</h3>
              {members.map((person, index) => {
                return (
                  <PersonTile
                    key={index}
                    specialist={person}
                    handleRemove={this.handleAssign}
                    removeTitle={removeText}
                  />
                );
              })}
            </StyledMembersWrapper>
          </Popup>
        )}
      </StyledMembersWrapper>
    );
  }
}

export default MembersDropdown;
