import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Form, Field, reset, change } from "redux-form";
import { Grid, Tab } from "semantic-ui-react";
import { required } from "../../helpers/validate";
import { DvBlueButton } from "../../styleComponents/layout/DvButton";
import StyledTab from "../../styleComponents/StyledTab";
import RenderSelect from "../forms/renders/RenderSelect";
import RenderCustomSelect from "../forms/renders/RenderCustomSelect";
import { getUserRole } from "../../helpers/functions";
import { S_REDGUY } from "../../constans/constans";

class InviteSpecialistForm extends Component {
  componentWillMount() {
    const { projects, projectId } = this.props;

    if (projectId) {
      const proj = projects.find(project => project.value === projectId);

      this.props.dispatch(
        change("InviteSpecialistForm", "project", proj.value)
      );
    }
  }

  renderProjects = () => {
    const { projects } = this.props;

    return (
      <Field
        name="project"
        // label="Select project"
        placeholder="Select project"
        className="transparent clear custom-select"
        component={RenderCustomSelect}
        validate={[required]}
        options={projects}
        isRequired
        fluid={true}
      />
    );
  };

  renderTeams = () => {
    const { teams } = this.props;

    return (
      <Field
        name="team"
        // label="Select team"
        placeholder="Select team"
        className="transparent clear custom-select"
        component={RenderCustomSelect}
        validate={[required]}
        options={teams}
        isRequired
        fluid={true}
      />
    );
  };

  render() {
    const { handleSubmit } = this.props;
    const panes = [
      {
        menuItem: "Project",
        render: () => <Tab.Pane>{this.renderProjects()}</Tab.Pane>
      },
      {
        menuItem: "Team",
        render: () => <Tab.Pane>{this.renderTeams()}</Tab.Pane>
      }
    ];

    return (
      <Form onSubmit={handleSubmit}>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={16}>
              {getUserRole() === S_REDGUY ? (
                <StyledTab
                  panes={panes}
                  onTabChange={() => this.props.reset()}
                />
              ) : (
                <Fragment>
                  <div className="modalHeader centered">Team</div>
                  {this.renderTeams()}
                </Fragment>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <DvBlueButton fluid role="button" className="clear dv-blue">
                Invite specialist
              </DvBlueButton>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

InviteSpecialistForm = reduxForm({
  form: "InviteSpecialistForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(InviteSpecialistForm);

const mapStateToProps = ({
  specialistData,
  specialistProjects,
  specialistCustomTeams
}) => {
  let projects = [],
    teams = [];

  getUserRole() === S_REDGUY &&
    specialistProjects &&
    specialistProjects.map(project =>
      projects.push({
        text: project.name,
        value: project.id
        // team: project.team.id
      })
    );

  specialistCustomTeams &&
    specialistCustomTeams.map(team =>
      teams.push({
        text: team.name,
        value: team.id
      })
    );
  return {
    projects,
    teams
  };
};

export default connect(mapStateToProps, null)(InviteSpecialistForm);
