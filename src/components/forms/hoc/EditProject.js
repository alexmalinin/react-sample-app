import React, { Component } from "react";
import { connect } from "react-redux";
import EditProjectForm from "../EditProjectForm";
import Axios from "axios";
import { PORT } from "../../../constants/constants";
// temporal
import {
  showProjectWithId,
  showSortedProjects,
  showAllEpics
} from "../../../actions/actions";
import {
  createNotification,
  getUserType,
  getUserRole
} from "../../../helpers/functions";
import { CLIENT, SPECIALIST, S_REDGUY } from "../../../constants/user";
import { run } from "../../../helpers/scrollToElement";

class EditProject extends Component {
  componentDidMount() {
    const {
      projectWithId: { project, loaded, loading },
      projectId,
      showAllEpics
    } = this.props;
    if (!loaded) {
      this.projectUpdate(projectId);
      showAllEpics(projectId);
    }
  }

  //move all async to one file

  submit = values => {
    const {
      projectId,
      projectWithId: { project },
      showSortedProjects
    } = this.props;

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

    let status = null,
      redGuyId = values["red_guy_id"];

    if (getUserRole() === S_REDGUY) {
      status = "discovery";
    } else {
      if (redGuyId) {
        status = "reviewed_by_admin";
      } else {
        status = values["state"];
      }
    }

    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${projectId}`,
      data: {
        project: {
          name: values["name"],
          description: values["description"],
          user_story: values["user_story"],
          state: status,
          business_requirements: values["business_requirements"],
          business_rules: values["business_rules"],
          deliverables: values["deliverables"],
          further_notes: values["further_notes"],
          attached_files_attributes: files,
          skill_ids
        },
        review: project.state === "reviewed_by_admin"
        // attached_files_attributes: files,
      },

      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
      }
    })
      .then(({ data }) => {
        const userType = getUserType();
        if (userType === CLIENT) showSortedProjects("customers");
        else if (userType === SPECIALIST) showSortedProjects("specialists");

        return data;
      })
      .then(({ name }) => {
        run(0)();
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
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
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

  projectUpdate = projectId => {
    if (projectId) {
      this.props.showProjectWithId(projectId);
    }
  };

  render() {
    const { projectId } = this.props;

    return (
      <EditProjectForm
        onSubmit={this.submit}
        projectId={projectId}
        handleAssignTeam={this.handleAssignTeam}
        projectUpdate={this.projectUpdate}
      />
    );
  }
}

export default connect(({ projectWithId }) => ({ projectWithId }), {
  showProjectWithId,
  showSortedProjects,
  showAllEpics
})(EditProject);
