import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change, getFormValues } from "redux-form";
import BillingForm from "./BillingForm";
import SubmitFormErrorModal from "../../modals/SubmitFormErrorModal";
import { checkObjectPropertiesForValues } from "../../../helpers/functions";

let renderError = true;

class ClientBillingForm extends Component {
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
    if (this.props.clientData) {
      this.fillFields(this.props.clientData);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

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
          handleEtaForm={this.handleEtaForm}
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

  handleChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value === "" ? null : e.target.value
      }
    });
  };

  handleEtaForm = date => {
    this.props.dispatch(change("ClientBillingForm", "expiry_date", date));
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
    console.log(nextProps.clientData);

    let client = nextProps.clientData;

    if (client) {
      if (client.successId) {
        if (renderError) {
          this.fillFields(client);
          renderError = false;
        }
      }
    }

    if (nextProps.formValues && this.props.isEditing) {
      if (this.state.fetchFormValues) {
        this.setState({
          formData: nextProps.formValues,
          fetchFormValues: false
        });
      }
    }

    if (
      (nextProps.submitFailed && this.state.fetchSubmitError) ||
      (nextProps.submitFailed && this.props.triggerSubmit)
    ) {
      this.setState({ submitError: true });
    }
  }

  fillFields = data => {
    let { customer_billing } = data;

    if (customer_billing) {
      this.initialFormValues = customer_billing;
    } else {
      this.initialFormValues = null;
    }

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

ClientBillingForm = connect(state => ({
  formValues: getFormValues("ClientBillingForm")(state)
}))(ClientBillingForm);

export default connect(state => {
  const { clientData } = state;
  return { clientData };
})(ClientBillingForm);
