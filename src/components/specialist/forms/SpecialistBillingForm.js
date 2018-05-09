import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import BillingForm from "./BillingForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

let renderError = true;

class SpecialistBillingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      submitError: false
    };
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} onChange={this.handleChange}>
        <BillingForm {...this.props} />
        <SubmitFormErrorModal
          isOpen={this.state.submitError}
          close={this.closeErrorModal}
        />
      </form>
    );
  }

  closeErrorModal = () => {
    this.setState({ submitError: false });
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
    if (nextState.formData) {
      this.props.handleFormValueChange(nextState.formData);
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

    if (nextProps.submitFailed && Object.keys(this.state.formData).length > 0) {
      this.setState({ submitError: true });
    } else {
      this.setState({ submitError: false });
    }
  }

  fillFields = data => {
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

export default connect(state => {
  const { specialistData } = state;
  return { specialistData };
})(SpecialistBillingForm);
