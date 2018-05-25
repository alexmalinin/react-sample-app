import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Field,
  reduxForm,
  change,
  getFormValues,
  getFormInitialValues
} from "redux-form";
import BillingForm from "./BillingForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";
import { checkObjectPropertiesForValues } from "../../../helpers/functions";

let renderError = true;

class SpecialistBillingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      fetchFormValues: true,
      fetchSubmitError: true,
      submitError: false
    };

    this.initialFormValues = {};
  }

  componentWillMount() {
    if (
      this.props.specialistData &&
      this.props.specialistData.specialist_billing
    ) {
      this.fillFields(this.props.specialistData.specialist_billing);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} onChange={this.handleChange}>
        <BillingForm
          {...this.props}
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

  handleChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value === "" ? null : e.target.value
      }
    });
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.isEditing) {
      if (checkObjectPropertiesForValues(nextState.formData)) {
        this.props.handleFormEdit(false);
      } else {
        this.props.handleFormEdit(true);
      }
    }

    if (this.props.isEditing) {
      if (!this.initialFormValues) {
        if (checkObjectPropertiesForValues(nextState.formData)) {
          this.props.handleFormEdit(false);
        } else {
          this.props.handleFormEdit(true);
        }
      } else {
        this.props.handleFormChange(nextState.formData, this.initialFormValues);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.specialistData &&
      nextProps.specialistData.specialist_billing
    ) {
      if (renderError) {
        this.fillFields(nextProps.specialistData.specialist_billing);
        renderError = false;
      }
    }

    if (nextProps.formValues) {
      if (this.state.fetchFormValues) {
        if (this.props.isEditing) {
          this.setState({
            formData: nextProps.formValues,
            fetchFormValues: false
          });
        }
      }
    }

    if (nextProps.submitFailed && this.state.fetchSubmitError) {
      this.setState({ submitError: true });
    }
  }

  fillFields = data => {
    this.initialFormValues = data;

    for (var key in data) {
      this.props.dispatch(change("SpecialistBillingForm", key, data[key]));
    }
  };
}

SpecialistBillingForm = reduxForm({
  form: "SpecialistBillingForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SpecialistBillingForm);

SpecialistBillingForm = connect(state => ({
  formValues: getFormValues("SpecialistBillingForm")(state),
  formInitialValues: getFormInitialValues("SpecialistBillingForm")(state)
}))(SpecialistBillingForm);

export default connect(state => {
  const { specialistData } = state;
  return { specialistData };
})(SpecialistBillingForm);
