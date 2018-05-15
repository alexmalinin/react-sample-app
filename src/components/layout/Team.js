import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, GridRow, Form, Input } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import {
  showAllSpecialists,
  createTeamChannel,
  showChannels,
  userType
} from "../../actions/actions";
import { CLIENT, S_REDGUY } from "../../constans/constans";

import Channel from "./Channel";
import AddChannelForm from "../forms/AddChannelForm";
import { getUserType } from "../../helpers/functions";

class Team extends Component {
  state = {
    name: "",
    channels: []
  };

  componentWillMount() {
    const { showAllSpecialists, team, showChannels } = this.props;
    showAllSpecialists();
    showChannels(team.id);
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  componentWillReceiveProps(nextProps) {
    //map channels from backend's index
    if (nextProps.allChannels) {
      if (nextProps.allChannels.team === nextProps.team.id) {
        this.setState({
          channels: nextProps.allChannels
        });
      }
    }

    //react to channel creation for display it instantly
    if (
      nextProps.createChannel &&
      nextProps.createChannel.team_id === nextProps.team.id
    ) {
      if (this.props.createChannel) {
        if (this.props.createChannel !== nextProps.createChannel) {
          nextProps.showChannels(nextProps.team.id);
        }
      } else nextProps.showChannels(nextProps.team.id);
    }

    if (nextProps.addMember) {
      if (this.props.addMember) {
        if (this.props.addMember !== nextProps.addMember) {
          nextProps.showChannels(nextProps.team.id);
        }
      } else nextProps.showChannels(nextProps.team.id);
    }

    if (nextProps.removeMember) {
      if (this.props.removeMember) {
        if (this.props.removeMember !== nextProps.removeMember) {
          nextProps.showChannels(nextProps.team.id);
        }
      } else nextProps.showChannels(nextProps.team.id);
    }

    if (nextProps.updateChannel) {
      if (this.props.updateChannel) {
        if (this.props.updateChannel !== nextProps.updateChannel) {
          nextProps.showChannels(nextProps.team.id);
        }
      } else nextProps.showChannels(nextProps.team.id);
    }

    if (nextProps.deleteChannel) {
      if (this.props.deleteChannel) {
        if (
          this.props.deleteChannel !== nextProps.deleteChannel &&
          nextProps.deleteChannel.team_id === nextProps.team.id
        ) {
          nextProps.showChannels(nextProps.team.id);
        }
      } else nextProps.showChannels(nextProps.team.id);
    }
  }

  renderToDashboard() {
    const { team, allSpecialists, changeUserType } = this.props;
    const { channels } = this.state;

    return (
      <Grid>
        <Grid.Row className="section-header">
          <Grid.Column computer={6} textAlign="left" floated="left">
            <p className="title">
              {team.name} {team.project_id && "project"}
            </p>
          </Grid.Column>
          <Grid.Column computer={2} textAlign="right" floated="right" />
        </Grid.Row>
        <Grid.Row className="channels">
          {channels.map((channel, key) => (
            <Channel
              channel={channel}
              key={key}
              allSpecialists={allSpecialists}
              specialists={""}
            />
          ))}
          {getUserType() !== S_REDGUY &&
            channels.length === 0 && <p>There is no channels yet :(</p>}
          {getUserType() === S_REDGUY && (
            <Form className="addChannel" onSubmit={this.submit}>
              <Input
                type="text"
                placeholder="#Add channel"
                name="name"
                value={this.state.name}
                onKeyUp={e => e.keyCode === 13 && e.target.blur()}
                onChange={this.handleChange}
              />
            </Form>
          )}
        </Grid.Row>
      </Grid>
    );
  }

  renderToRightSidebar() {
    const { team, allSpecialists } = this.props;
    const { channels } = this.state;

    return (
      <Fragment>
        <h4>{team.name}</h4>

        {channels && channels.length !== 0
          ? channels.map((channel, key) => (
              <Channel
                channel={channel}
                key={key}
                allSpecialists={allSpecialists}
                renderToRightSidebar
              />
            ))
          : "There is no channels"}
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
    const { team, createTeamChannel } = this.props;
    const data = {
      name: this.state.name
    };
    createTeamChannel(team.id, data);
    this.setState({ name: "" });
  };
}

export default connect(
  ({
    allSpecialists,
    createChannel,
    allChannels,
    addMember,
    removeMember,
    updateChannel,
    deleteChannel,
    changeUserType
  }) => ({
    allSpecialists,
    createChannel,
    allChannels,
    addMember,
    removeMember,
    updateChannel,
    deleteChannel,
    changeUserType
  }),
  { showAllSpecialists, createTeamChannel, showChannels }
)(Team);
