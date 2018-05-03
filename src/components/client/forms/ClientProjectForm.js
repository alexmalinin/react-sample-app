import React, { Component } from "react";
import { Field, reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import { SaveBtn } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import { Grid } from "semantic-ui-react";
import ProjectForm from "./ProjectForm";

let renderError = true;

class ClientProjectForm extends Component {
  componentWillMount() {
    this.clearFileds();
  }

  clearFileds = () => {
    this.props.dispatch(reset("ClientProjectForm"));
  };

  render() {
    const { handleSubmit, submitting, clientData } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <ProjectForm clientData={clientData} submitting={submitting} />
      </form>
    );
  }
}

ClientProjectForm = reduxForm({
  form: "ClientProjectForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClientProjectForm);

export default connect(state => {
  const { clientData } = state;
  return { clientData };
})(ClientProjectForm);
