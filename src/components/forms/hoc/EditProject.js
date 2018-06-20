import React, { Component } from "react";
import { connect } from "react-redux";
import EditProjectForm from "../EditProjectForm";
import Axios from "axios";
import { PORT } from "../../../constans/constans";
// temporal
import { showProjectWithId, showAllProjects } from "../../../actions/actions";
import { createNotification } from "../../../helpers/functions";

class EditProject extends Component {
  componentWillMount() {
    this.props.showProjectWithId(this.props.projectId);
  }

  //move all async to one file

  submit = values => {
    values.project_id = this.props.projectId;
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
      url: `${PORT}/api/v1/projects/${this.props.projectId}`,
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
        review: this.props.projectWithId.state === "reviewed_by_admin"
        // attached_files_attributes: files,
      }
    })
      .then(({ data }) => {
        this.props.showProjectWithId(this.props.projectId);
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
        createNotification({
          type: "error"
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
  showAllProjects
})(EditProject);
