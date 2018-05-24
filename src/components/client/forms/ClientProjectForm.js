import React, { Component } from "react";
import { reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import ProjectForm from "./ProjectForm";
import { getSkills } from "../../../actions/actions";

class ClientProjectForm extends Component {
  componentWillMount() {
    this.props.reset("ClientProjectForm");
    this.props.getSkills();
  }

  handleSelectChange = (e, name) => {
    console.log(e, name);
  };

  render() {
    const { handleSubmit, submitting, clientData, skills } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <ProjectForm
          clientData={clientData}
          submitting={submitting}
          skills={skills}
          handleSelectChange={this.handleSelectChange}
        />
      </form>
    );
  }
}

ClientProjectForm = reduxForm({
  form: "ClientProjectForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClientProjectForm);

export default connect(({ clientData, skills }) => ({ clientData, skills }), {
  getSkills,
  reset
})(ClientProjectForm);
