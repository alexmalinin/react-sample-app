import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { required } from "../../../helpers/validate";
import RenderField from "../../forms/renders/RenderField";
import RenderSelect from "../../forms/renders/RenderSelect";
import { clientCategories } from "../../../helpers/selects/clientCategories";
import { DvButton } from "../../../styleComponents/layout/DvButton";
import InputField from "../../forms/renders/InputField";
import LocationField from "../../forms/renders/LocationField";
import RenderTextArea from "../../forms/renders/RenderTextArea";
import BillingForm from "./BillingForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";

let renderError = true;

class ClientBillingForm extends Component {
  state = {
    formData: {},
    submitError: false
  };

  render() {
    const {
      handleSubmit,
      submitting,
      clientData,
      handleFormField,
      swichTab,
      isEditing
    } = this.props;

    return (
      <form onSubmit={handleSubmit} onChange={this.handleChange}>
        <BillingForm
          clientData={clientData}
          submitting={submitting}
          handleFormField={handleFormField}
          swichTab={swichTab}
          isEditing={isEditing}
        />
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
    let client = nextProps.clientData;

    if (client) {
      if (client.successId) {
        if (renderError) {
          this.fillFields(client);
          renderError = false;
        }
      }
    }

    if (nextProps.submitFailed && Object.keys(this.state.formData).length > 0) {
      this.setState({ submitError: true });
    } else {
      this.setState({ submitError: false });
    }
  }

  fillFields = data => {
    let { customer_billing } = data;

    for (let key in customer_billing) {
      this.props.dispatch(
        change("ClientBillingForm", key, customer_billing[key])
      );
    }
  };
}

ClientBillingForm = reduxForm({
  form: "ClientBillingForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ClientBillingForm);

export default connect(state => {
  const { clientData } = state;
  return { clientData };
})(ClientBillingForm);
