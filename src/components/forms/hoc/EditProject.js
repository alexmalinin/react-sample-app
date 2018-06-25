import React, { Component } from "react";
import { connect } from "react-redux";
import EditProjectForm from "../EditProjectForm";
import Axios from "axios";
import { PORT } from "../../../constans/constans";
// temporal
import {
  showProjectWithId,
  showAllProjects,
  showAllEpics
} from "../../../actions/actions";
import { createNotification } from "../../../helpers/functions";

class EditProject extends Component {
  componentDidMount() {
    const {
      projectWithId,
      projectId,
      showProjectWithId,
      showAllEpics
    } = this.props;
    if (!projectWithId) {
      showProjectWithId(projectId);
      showAllEpics(projectId);
      console.log("load");
    }
  }

  //move all async to one file

  submit = values => {
    const { projectId, projectWithId } = this.props;

    values.project_id = projectId;
    let skill_ids =
      values["skills"] &&
      values["skills"].map(skill => {
        return skill.value;
      });

    let files = values.file
      ? values.file.map(file => {
          return {
            document: file,
            entity_type: "Project"
          };
        })
      : [];

    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${projectId}`,
      data: {
        project: {
          name: values["name"],
          description: values["description"],
          user_story: values["user_story"],
          state: values["state"],
          business_requirements: values["business_requirements"],
          business_rules: values["business_rules"],
          deliverables: values["deliverables"],
          further_notes: values["further_notes"],
          attached_files_attributes: files,
          skill_ids
        },
        review: projectWithId.state === "reviewed_by_admin"
        // attached_files_attributes: files,
      }
    })
      .then(({ data }) => {
        this.props.showAllProjects();

        return data;
      })
      .then(({ name }) => {
        createNotification({
          type: "success",
          text: `${name ? `${name} project ` : "Project"} was published`
        });
      })
      .catch(error => {
        createNotification({
          type: "error"
        });

        console.error(error);
      });
  };

  //move all async to one file

  handleAssignTeam = id => {
    const { projectId } = this.props;

    return Axios({
      method: "POST",
      url: `${PORT}/api/v1/teams/${id}/invite_team_members`,
      data: {
        project_id: projectId
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

  render() {
    const { projectId } = this.props;

    return (
      <React.Fragment>
        <EditProjectForm
          onSubmit={this.submit}
          projectId={projectId}
          handleAssignTeam={this.handleAssignTeam}
        />
      </React.Fragment>
    );
  }
}

export default connect(({ projectWithId }) => ({ projectWithId }), {
  showProjectWithId,
  showAllProjects,
  showAllEpics
})(EditProject);
