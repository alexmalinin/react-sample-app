import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import BillingForm from "./BillingForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

class SpecialistBillingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchSubmitError: true,
      submitError: false
    };
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <BillingForm
          {...this.props}
          handleFormField={this.handleFormField}
          handleEtaForm={this.handleEtaForm}
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

SpecialistBillingForm = reduxForm({
  form: "SpecialistBillingForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(SpecialistBillingForm);

export default connect(state => {
  const { specialistData } = state;

  const billingData = (specialistData && specialistData.billing) || {};

  return {
    specialistData,
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
})(SpecialistBillingForm);
