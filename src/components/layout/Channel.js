import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Form, Input } from "semantic-ui-react";

import { AssignDropdown, PersonTile } from "./AssignDropdown";

import {
  IMAGE_PORT,
  CLIENT,
  SPECIALIST,
  S_REDGUY
} from "../../constans/constans";
import {
  addToChannel,
  removeFromChannel,
  updateTeamChannel,
  deleteTeamChannel
} from "../../actions/actions";
import { getUserType } from "../../helpers/functions";

class Channel extends Component {
  state = {
    name: this.props.channel.name,
    editFocused: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.channel.name
    });
  }

  handleAssign = (type, specId) => {
    const { channel, addToChannel, removeFromChannel } = this.props;

    if (type === "assign") {
      addToChannel(channel.team_id, channel.id, specId);
    } else removeFromChannel(channel.team_id, channel.id, specId);
  };

  handleEdit = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  deleteChannel = () => {
    const { deleteTeamChannel, channel } = this.props;
    deleteTeamChannel(channel.team_id, channel.id);
    setTimeout(() => {
      this.hideDeleteConfirmation();
    }, 100);
  };

  openDeleteConfirmation = () => {
    this.setState({
      showDeleteConfirmation: true
    });
  };

  hideDeleteConfirmation = () => {
    this.setState({
      showDeleteConfirmation: false,
      name: this.props.channel.name
    });
  };

  renderToDashboard() {
    const { channel, allSpecialists, changeUserType } = this.props;
    const { name, showDeleteConfirmation } = this.state;

    return (
      <div className="channel">
        <div className="title">
          <Form className="editChannel" onSubmit={this.submit}>
            <Input
              type="text"
              placeholder="Channel name"
              name="name"
              disabled={getUserType() !== S_REDGUY}
              value={name}
              ref={Input => (this.editInput = Input)}
              onKeyUp={e => e.keyCode === 13 && e.target.blur()}
              onBlur={this.submit}
              onChange={this.handleEdit}
            />
          </Form>
          {getUserType() === S_REDGUY && (
            <div
              className={`deleteConfirmation${
                showDeleteConfirmation ? " show" : ""
              }`}
            >
              <button onClick={this.deleteChannel}>Yes</button>
              <button onClick={this.hideDeleteConfirmation}>No</button>
            </div>
          )}
          {getUserType() === S_REDGUY && (
            <button onClick={this.openDeleteConfirmation} className="delete">
              <img src="/images/trashcan.png" alt="delete" />
            </button>
          )}
        </div>
        <div className="members">
          {channel.specialists.map((person, key) => (
            <PersonTile
              key={key}
              specialist={person}
              handleRemove={this.handleAssign}
              labeled
              removeTitle="channel"
              userType={changeUserType}
              renderToDashboard
            />
          ))}
          <AssignDropdown
            label="Add member"
            specialists={channel.specialists}
            allSpecialists={allSpecialists}
            handleAssign={this.handleAssign}
            userType={changeUserType}
            closeOnChange={true}
            renderToDashboard
          />
        </div>
      </div>
    );
  }

  renderToRightSidebar() {
    const { channel, changeUserType, allSpecialists } = this.props;

    return (
      <Fragment>
        <h5>#{channel.name}</h5>

        <div className="persons team">
          {channel.specialists.map((person, key) => (
            <PersonTile
              key={key}
              specialist={person}
              handleRemove={this.handleAssign}
              labeled
              removeTitle="channel"
              userType={changeUserType}
            />
          ))}
          <AssignDropdown
            label="Add member"
            specialists={channel.specialists}
            allSpecialists={allSpecialists}
            handleAssign={this.handleAssign}
            userType={changeUserType}
            closeOnChange={true}
          />
        </div>
      </Fragment>
    );
  }

  render() {
    const { renderToRightSidebar } = this.props;

    return renderToRightSidebar
      ? this.renderToRightSidebar()
      : this.renderToDashboard();
  }

  submit = () => {
    const { updateTeamChannel, channel } = this.props;
    const data = {
      name: this.state.name
    };
    if (!!this.state.name) {
      updateTeamChannel(channel.team_id, channel.id, data);
    } else this.openDeleteConfirmation();
  };
}

export default connect(({ changeUserType }) => ({ changeUserType }), {
  addToChannel,
  removeFromChannel,
  updateTeamChannel,
  deleteTeamChannel
})(Channel);
