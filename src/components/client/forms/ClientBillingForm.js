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

  const billingData = (clientData && clientData.billing) || {};

  return {
    clientData,
    initialValues: {
      billing_type: billingData && billingData.billing_type,
      card_name: billingData && billingData.card_name,
      card_number: billingData && billingData.card_number,
      beneficiary_account: billingData && billingData.beneficiary_account,
      beneficiary_bank: billingData && billingData.beneficiary_bank,
      beneficiary_name: billingData && billingData.beneficiary_name,
      correspondent_bank: billingData && billingData.correspondent_bank,
      iban: billingData && billingData.iban,
      purpose_of_payment: billingData && billingData.purpose_of_payment,
      swift_code: billingData && billingData.swift_code
    }
  };
})(ClientBillingForm);
