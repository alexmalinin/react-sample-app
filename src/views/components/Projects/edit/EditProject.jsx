import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { reduxForm } from "redux-form";

import EditProjectForm from "./EditProjectForm";

import { updateProject, publishProject } from "@ducks/projects/actions";
import {
  showProjectTeam,
  removeSpecialistFromTeam
} from "@ducks/teams/actions";
import { getSkills } from "@ducks/skills/actions";

import { getProjectTeam, getCustomTeams } from "@ducks/teams/selectors";
import { PORT, createNotification, renameObjPropNames } from "@utilities";
import { getDataForSelect } from "@utilities/selectors";

class EditProject extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    projectWithId: {}
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.props.getSkills();

    if (params.projectId) {
      this.props.showProjectTeam(params.projectId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.projectId !== nextProps.match.params.projectId
    ) {
      this.props.showProjectTeam(nextProps.match.params.projectId);
    }
  }

  handleAssignTeam = id => {
    const {
      match: { params }
    } = this.props;

    return axios({
      method: "POST",
      url: `${PORT}/api/v1/teams/${id}/invite_team_members`,
      data: {
        project_id: params.projectId
      }
    })
      .then(() => {
        createNotification({
          type: "success",
          text: "Team was invited"
        });
      })
      .catch(error => {
        const {
          response: { data }
        } = error;

        createNotification({
          type: data && data.errors ? "warning" : "error",
          text: data && data.errors
        });

        console.error(error);
      });
  };

  handleSkills = (e, name) => {
    let skillsIds = [];
    for (let key in e) {
      e[key].value && skillsIds.push(e[key].value);
    }

    this.onSelfSubmit("skill_ids", skillsIds)
      .then(data => {
        const skills = data.skills;

        skills.forEach(skill => {
          renameObjPropNames(skill, "id", "value");
          renameObjPropNames(skill, "name", "label");
        });

        this.props.change("skills", skills);
      })
      .catch(error => {
        this.props.change("skills", this.props.projectWithId.skills);
        console.error(error);
      });
  };

  onSelfSubmit = (name, value) => {
    const {
      projectWithId: { id }
    } = this.props;

    return axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${id}`,
      data: {
        project: {
          [name]: value
        }
      }
    }).then(({ data }) => {
      this.props.updateProject(data.id, data);

      return data;
    });
  };

  handleRemove = (type, id) => {
    const {
      removeSpecialistFromTeam,
      projectWithId: {
        team: { id: team_id }
      }
    } = this.props;

    removeSpecialistFromTeam(team_id, id);
    this.updateProject();
  };

  updateProject = () => {
    const {
      projectWithId: { id }
    } = this.props;

    this.props.updateProject(id);
  };

  submit = values => this.props.publishProject(values);

  render() {
    const { handleSubmit } = this.props;

    return (
      <EditProjectForm
        {...this.props}
        handleSubmit={handleSubmit(this.submit)}
        handleAssignTeam={this.handleAssignTeam}
        onSelfSubmit={this.onSelfSubmit}
        handleSkills={this.handleSkills}
        updateProject={this.updateProject}
        handleRemove={this.handleRemove}
      />
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const {
    user: { role },
    projects,
    teams: { byId: allTeams },
    projectTypesReducer: { projectTypes },
    skills
  } = state;

  const projectWithId = projects.byId[params.projectId] || {};

  return {
    userRole: role,
    projectWithId,
    initialValues: {
      ...projectWithId,
      skills: getDataForSelect()(projectWithId.skills)
    },
    projectTeam: getProjectTeam()(allTeams, params.projectId),
    allCustomTeams: getCustomTeams(allTeams),
    projectTypes,
    skillsOptions: getDataForSelect()(skills, "value", "label")
  };
};

const mapDispatchToProps = {
  updateProject,
  publishProject,
  showProjectTeam,
  removeSpecialistFromTeam,
  getSkills
};

const withForm = reduxForm({
  form: "EditProjectForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withForm(EditProject)
);
