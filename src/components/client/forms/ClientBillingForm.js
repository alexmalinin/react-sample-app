import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import BillingForm from "./BillingForm";

let renderError = true;

class ClientBillingForm extends Component {
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
      <form onSubmit={handleSubmit}>
        <BillingForm
          clientData={clientData}
          submitting={submitting}
          handleFormField={handleFormField}
          swichTab={swichTab}
          isEditing={isEditing}
        />
      </form>
    );
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
