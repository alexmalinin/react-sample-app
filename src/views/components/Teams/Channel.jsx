import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input } from "semantic-ui-react";

import AssignDropdown from "../../../components/layout/AssignDropdown";
import PersonTile from "@UI/PersonTile";
import MembersDropdown from "@UI/MembersDropdown";

import { S_REDGUY } from "@utilities";
// import {
//   addToChannel,
//   removeFromChannel,
//   updateTeamChannel,
//   deleteTeamChannel
// } from "../../actions/actions";
// import { getUserRole } from "../../helpers/functions";

class Channel extends Component {
  static propTypes = {};

  state = {
    name: this.props.channel.name,
    editFocused: false,
    error: false
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
    let validated = value.length > 16;

    if (value.length <= 16) {
      this.setState({
        [name]: value
      });
    }

    this.setState({
      error: validated
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
    const { channel, allSpecialists, specialists } = this.props;
    const { name, showDeleteConfirmation } = this.state;
    const isGeneral = channel.name === "General";

    return (
      <div className="channel">
        <div className="title">
          <Form className="editChannel" onSubmit={this.submit}>
            {this.state.error && (
              <span className="channel-label_error">
                Must be less then 16 characters
              </span>
            )}
            <Input
              type="text"
              placeholder="Channel name"
              name="name"
              className="channel-name"
              disabled={this.props.user.role !== S_REDGUY || isGeneral}
              value={name}
              ref={Input => (this.editInput = Input)}
              onKeyUp={e => e.keyCode === 13 && e.target.blur()}
              onBlur={this.submit}
              onChange={this.handleEdit}
              autoComplete="off"
            />
          </Form>
          {this.props.user.role === S_REDGUY && (
            <div
              className={`deleteConfirmation${
                showDeleteConfirmation ? " show" : ""
              }`}
            >
              <button onClick={this.deleteChannel}>Yes</button>
              <button onClick={this.hideDeleteConfirmation}>No</button>
            </div>
          )}
          {!isGeneral &&
            this.props.user.role === S_REDGUY && (
              <button onClick={this.openDeleteConfirmation} className="delete">
                <img src="/images/trashcan.png" alt="delete" />
              </button>
            )}
        </div>
        <div className="members">
          {channel.specialists &&
            channel.specialists.map(id => (
              <PersonTile
                key={id}
                specialist={specialists[id]}
                handleRemove={this.handleAssign}
                labeled
                removeTitle="channel"
                userType={[]}
                hideDelete={isGeneral}
                renderToDashboard
              />
            ))}
          {!isGeneral && (
            <AssignDropdown
              label="Add member"
              specialists={channel.specialists}
              allSpecialists={allSpecialists}
              handleAssign={this.handleAssign}
              userType={[S_REDGUY]}
              closeOnChange={true}
              renderToDashboard
            />
          )}
        </div>
      </div>
    );
  }

  renderToRightSidebar() {
    const { channel, allSpecialists } = this.props;
    const isGeneral = channel.name === "General";

    return (
      <Fragment>
        <div className="team-channel">#{channel.name}</div>

        <div className="persons team">
          <MembersDropdown
            members={channel.specialists}
            countToShow={3}
            position="bottom left"
            handleRemove={this.handleAssign}
            removeText="channel"
            hideDelete={isGeneral}
          />
          {!isGeneral && (
            <AssignDropdown
              label="Add member"
              specialists={channel.specialists}
              allSpecialists={allSpecialists}
              handleAssign={this.handleAssign}
              userType={[S_REDGUY]}
              closeOnChange={true}
              bordered
            />
          )}
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

    this.setState({ error: false });
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    channel: state.channels[ownProps.channelId],
    specialists: state.specialists
  };
};

export default connect(mapStateToProps, {
  // addToChannel,
  // removeFromChannel,
  // updateTeamChannel,
  // deleteTeamChannel
})(Channel);
