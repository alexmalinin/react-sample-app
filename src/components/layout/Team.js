import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Form, Input } from "semantic-ui-react";

import {
  showAllSpecialists,
  createTeamChannel,
  showChannels,
  showProjectTeam
} from "../../actions/actions";
import { S_REDGUY, S_CORE } from "../../constans/constans";
import Channel from "./Channel";
import { getUserRole, oneOfRoles } from "../../helpers/functions";

class Team extends Component {
  state = {
    name: "",
    channels: [],
    specialistsList: null
  };

  componentWillMount() {
    const { showProjectTeam, team, showChannels } = this.props;

    team.project_id && showProjectTeam(team.project_id);
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
        this.setState(
          state =>
            state.channels === nextProps.allChannels
              ? null
              : { channels: nextProps.allChannels }
        );
      }
    }

    if (nextProps.projectTeam) {
      if (nextProps.projectTeam.id === nextProps.team.id) {
        this.setState(
          state =>
            state.specialistsList === nextProps.projectTeam.specialists
              ? null
              : { specialistsList: nextProps.projectTeam.specialists }
        );
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
    const {
      team,
      team: { custom_team, specialist_id },
      specialistId
    } = this.props;
    const { channels, specialistsList } = this.state;

    return (
      <Grid>
        <Grid.Row className="section-header">
          <Grid.Column computer={6} textAlign="left" floated="left">
            <p className="title">
              {team.name} {team.project_id && "project"}
            </p>
          </Grid.Column>
          {oneOfRoles(S_REDGUY, S_CORE) &&
            custom_team &&
            +specialist_id === +specialistId && (
              <Grid.Column
                computer={6}
                textAlign="right"
                verticalAlign="bottom"
                floated="right"
              >
                <div
                  className="dv-btn"
                  onClick={() => this.props.removeTeam(team)}
                >
                  <i className="fas fa-trash" />
                </div>
              </Grid.Column>
            )}
        </Grid.Row>
        <Grid.Row className="channels">
          {channels.map((channel, key) => (
            <Channel
              channel={channel}
              key={key}
              allSpecialists={specialistsList}
              specialists={""}
            />
          ))}
          {getUserRole() !== S_REDGUY &&
            channels.length === 0 && <p>There is no channels yet :(</p>}
          {getUserRole() === S_REDGUY && (
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
    const { team } = this.props;
    const { channels, specialistsList } = this.state;

    return (
      <Fragment>
        <h4>{team.name}</h4>

        {channels && channels.length !== 0
          ? channels.map((channel, key) => (
              <Channel
                channel={channel}
                key={key}
                allSpecialists={specialistsList}
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
    changeUserType,
    projectTeam
  }) => ({
    allSpecialists,
    createChannel,
    allChannels,
    addMember,
    removeMember,
    updateChannel,
    deleteChannel,
    changeUserType,
    projectTeam
  }),
  { showAllSpecialists, createTeamChannel, showChannels, showProjectTeam }
)(Team);
