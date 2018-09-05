import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, getFormValues } from "redux-form";
import BillingForm from "./BillingForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

class ClientBillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchSubmitError: true,
      submitError: false
    };
  }

  render() {
    const {
      handleSubmit,
      submitting,
      clientData,
      swichTab,
      isEditing
    } = this.props;

    return (
      <form onSubmit={handleSubmit} onChange={this.handleChange}>
        <BillingForm
          {...this.props}
          clientData={clientData}
          submitting={submitting}
          swichTab={swichTab}
          isEditing={isEditing}
          handleSubmitError={this.handleSubmitError}
        />
        <SubmitFormErrorModal
          isOpen={this.state.submitError}
          close={this.closeErrorModal}
        />
      </form>
    );
  }

  closeErrorModal = () => {
    this.setState({ submitError: false, fetchSubmitError: false });
  };

  handleSubmitError = () => {
    if (this.props.submitFailed && this.props.invalid) {
      this.setState({ submitError: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.props.handleFormEdit(nextProps.dirty);

    if (
      (nextProps.submitFailed && this.state.fetchSubmitError) ||
      (nextProps.submitFailed && this.props.triggerSubmit)
    ) {
      this.setState({ submitError: true });
    }
  }
}

ClientBillingForm = reduxForm({
  form: "ClientBillingForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(ClientBillingForm);

export default connect(state => {
  const { clientData } = state;

  const { billing } = clientData || {};

  return {
    clientData,
    initialValues: {
      ...billing
    }
  };
})(ClientBillingForm);
