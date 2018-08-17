import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Form, Field, change } from "redux-form";
import { Grid, Tab } from "semantic-ui-react";

import { required } from "@views/utils/validate";
import { DvBlueButton } from "@styled/DVButton";
import Tabs from "@styled/Tabs";
import RenderSelect from "@UI/inputs/SelectField";
import { S_REDGUY } from "@utilities";

import { getDataForSelect } from "@utilities/selectors";
import { getCustomTeams } from "@ducks/teams/selectors";

class InviteSpecialistForm extends Component {
  componentDidMount() {
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
        placeholder="Select project"
        component={RenderSelect}
        options={projects}
        fluid={true}
        validate={[required]}
        isRequired
      />
    );
  };

  renderTeams = () => {
    const { teams } = this.props;

    return (
      <Field
        name="team"
        placeholder="Select team"
        component={RenderSelect}
        options={teams}
        fluid={true}
        validate={[required]}
        isRequired
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
              {this.props.isRedguy ? (
                <Tabs panes={panes} onTabChange={() => this.props.reset()} />
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

const mapStateToProps = state => {
  const prepareProjects = getDataForSelect(),
    prepareTeams = getDataForSelect();

  const showCustomTeams = getCustomTeams();

  return ({ user: { role }, projectsReducer: { projects } }) => {
    let allProjects = [],
      allTeams = [];

    if (role === S_REDGUY) {
      allProjects = prepareProjects(projects, "value", "text");
    }

    allTeams = showCustomTeams(state);
    allTeams = prepareTeams(allTeams, "value", "text");

    return {
      projects: allProjects,
      teams: allTeams,
      isRedguy: role === S_REDGUY
    };
  };
};

export default connect(mapStateToProps, null)(InviteSpecialistForm);
