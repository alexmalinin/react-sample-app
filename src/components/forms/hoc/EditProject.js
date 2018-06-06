import React, { Component } from "react";
import EditProjectForm from "../EditProjectForm";
import Axios from "axios";
import { PORT } from "../../../constans/constans";
import { S_Message } from "../../../styleComponents/layout/S_Message";
import { Message } from "semantic-ui-react";
// temporal
import { showProjectWithId } from "../../../actions/actions";
import { connect } from "react-redux";

class EditProject extends Component {
  state = {
    renderMessage: false,
    renderErrorMessage: false
  };

  submit = values => {
    values.project_id = this.props.projectId;
    let skill_ids =
      values["skills"] &&
      values["skills"].map(skill => {
        return skill.value;
      });

    let files = values.file
      ? values.file.split("||").map(file => {
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
      .then(response => {
        this.setState({ renderMessage: true });
        setTimeout(() => {
          this.setState({ renderMessage: false, renderErrorMessage: false });
        }, 2500);
        // this.props.initialize("EditProjectForm", response.data, false, {
        //   keepSubmitSucceeded: false
        // });
        // Try to keep succeed and dirty
        this.props.showProjectWithId(this.props.projectId);
      })
      .catch(error => {
        console.log(error);
        this.setState({ renderErrorMessage: true });
        setTimeout(() => {
          this.setState({ renderMessage: false, renderErrorMessage: false });
        }, 2500);
      });
  };

  render() {
    const { projectId } = this.props;
    const { renderMessage, renderErrorMessage } = this.state;

    return (
      <React.Fragment>
        <EditProjectForm onSubmit={this.submit} projectId={projectId} />
        <S_Message positive profile="true" data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Project updated</p>
        </S_Message>
        <S_Message negative profile="true" data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
      </React.Fragment>
    );
  }
}

export default connect(({ projectWithId }) => ({ projectWithId }), {
  showProjectWithId
})(EditProject);
