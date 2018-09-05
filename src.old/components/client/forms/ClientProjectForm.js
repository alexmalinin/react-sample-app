import React, { Component } from "react";
import { reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import ProjectForm from "./ProjectForm";
import {
  getSkills,
  showAllClients,
  getProjectTypes
} from "../../../actions/actions";
import StyledProject from "../../../styleComponents/StyledProject";

class ClientProjectForm extends Component {
  componentWillMount() {
    this.props.reset("ClientProjectForm");
    this.props.getSkills();
    this.props.showAllClients();
    this.props.getProjectTypes();
  }

  handleSelectChange = (e, name) => {
    console.log(e, name);
  };

  render() {
    const {
      handleSubmit,
      submitting,
      clientData,
      skills,
      projectTypes,
      allClients
    } = this.props;

    return (
      <StyledProject>
        <form onSubmit={handleSubmit}>
          <ProjectForm
            clientData={clientData}
            submitting={submitting}
            skills={skills}
            projectTypes={projectTypes}
            allClients={allClients}
            handleSelectChange={this.handleSelectChange}
          />
        </form>
      </StyledProject>
    );
  }
}

ClientProjectForm = reduxForm({
  form: "ClientProjectForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClientProjectForm);

const mapStateToProps = state => {
  const { clientData, skills, projectTypes, allClients } = state;
  let options = [];

  allClients.forEach(client => {
    options.push({
      label: `${client.first_name} ${client.last_name}`,
      value: client.id
    });
  });

  return {
    clientData,
    skills,
    projectTypes,
    allClients: options
  };
};

export default connect(mapStateToProps, {
  getSkills,
  showAllClients,
  getProjectTypes,
  reset
})(ClientProjectForm);
