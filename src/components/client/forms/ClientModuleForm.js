import React, { Component } from "react";
import { reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import ModuleForm from "./ModuleForm";

class ClientModuleForm extends Component {
  componentWillMount() {
    this.clearFileds();
  }

  clearFileds = () => {
    this.props.dispatch(reset("ClientModuleForm"));
  };

  handleEtaForm = date => {
    this.props.dispatch(change("ClientModuleForm", "eta", date));
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <ModuleForm
          submitting={submitting}
          handleEtaForm={this.handleEtaForm}
        />
      </form>
    );
  }
}

ClientModuleForm = reduxForm({
  form: "ClientModuleForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClientModuleForm);

export default connect(state => {
  const { clientData } = state;
  return { clientData };
})(ClientModuleForm);
