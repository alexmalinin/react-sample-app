import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Form, Input } from "semantic-ui-react";

import {
  showAllSpecialists,
  createTeamChannel,
  showChannels,
  showProjectTeam,
  showCustomTeam
} from "../../actions/actions";
import { S_REDGUY, S_CORE } from "../../constants/user";
import Channel from "./Channel";
import { getUserRole, oneOfRoles } from "../../helpers/functions";

class Team extends Component {
  state = {
    name: "",
    channels: [],
    specialistsList: null,
    error: false
  };

  componentWillMount() {
    const { showProjectTeam, showCustomTeam, team, showChannels } = this.props;

    if (team.custom_team) {
      showCustomTeam(team.id);
    } else showProjectTeam(team.project_id);
    showChannels(team.id);
  }

  handleChange = (e, { name, value }) => {
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

    if (nextProps.customTeam) {
      if (nextProps.customTeam.id === nextProps.team.id) {
        this.setState({ specialistsList: nextProps.customTeam.specialists });
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
            <p className="title team-name">
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
          {getUserRole() === S_REDGUY ? (
            <Form className="addChannel" onSubmit={this.submit}>
              {this.state.error && (
                <span className="addChannel-label">
                  Must be less then 16 characters
                </span>
              )}
              <Input
                type="text"
                placeholder="#Add channel"
                name="name"
                value={this.state.name}
                onKeyUp={e => e.keyCode === 13 && e.target.blur()}
                onChange={this.handleChange}
                onBlur={() => this.setState({ error: false })}
                autoComplete="off"
              />
            </Form>
          ) : (
            channels.length === 0 && <p>There is no channels yet :(</p>
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
        <div className="team-wrap">
          <div className="team-name">{team.name}</div>

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
    const { team, createTeamChannel } = this.props;
    const data = {
      name: this.state.name
    };
    createTeamChannel(team.id, data);
    this.setState({ name: "", error: false });
  };
}

const mapStateToProps = state => {
  return {
    createChannel: state.createChannel,
    allChannels: state.allChannels,
    addMember: state.addMember,
    removeMember: state.removeMember,
    updateChannel: state.updateChannel,
    deleteChannel: state.deleteChannel,
    projectTeam: state.projectTeam,
    customTeam: state.customTeam
  };
};

export default connect(mapStateToProps, {
  showAllSpecialists,
  createTeamChannel,
  showChannels,
  showProjectTeam,
  showCustomTeam
})(Team);
