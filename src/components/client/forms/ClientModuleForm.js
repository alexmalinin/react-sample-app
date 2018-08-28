import React, { Component } from "react";
import { reduxForm, change, reset } from "redux-form";
import { connect } from "react-redux";
import ModuleForm from "./ModuleForm";
import StyledEpicPage from "@styled/EpicPage";

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
    const { handleSubmit, submitting, projectId } = this.props;

    return (
      <StyledEpicPage>
        <form onSubmit={handleSubmit}>
          <ModuleForm
            projectId={projectId}
            submitting={submitting}
            handleEtaForm={this.handleEtaForm}
          />
        </form>
      </StyledEpicPage>
    );
  }
}

ClientModuleForm = reduxForm({
  form: "ClientModuleForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true
})(ClientModuleForm);

export default connect(({ clientData }) => ({ clientData }), null)(
  ClientModuleForm
);
