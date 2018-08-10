import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ClientBillingForm from "./forms/ClientBillingForm";
import {
  showClientData,
  getIndustries,
  updateClientBilling
} from "../../actions/actions";
import { run } from "../../helpers/scrollToElement";
import { getAllUrlParams } from "../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../modals/ConfirmationModal";

class ClientBilling extends Component {
  constructor() {
    super();

    this.state = {
      nextStep: false,
      isEditing: false,
      isEdited: false,
      nextLocation: false
    };
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

  componentWillMount() {
    this.props.showClientData();
    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  render() {
    const { isEditing, isEdited, nextStep, nextLocation } = this.state;
    const { clientData } = this.props;

    return (
      <div>
        <ClientBillingForm
          onChange={this.change}
          clientData={clientData}
          onSubmit={this.submit}
          isEditing={isEditing}
          isEdited={isEdited}
          handleFormEdit={this.handleFormEdit}
        />

        <NavigationPrompt
          when={(crntLocation, nextLocation) => {
            this.setState({
              nextLocation: nextLocation.pathname + nextLocation.search
            });
            return isEdited && !nextStep;
          }}
        >
          {({ onConfirm, onCancel }) => (
            <ConfirmationModal
              isOpen={true}
              formId="ClientBillingForm"
              clearLocation={this.clearLocation}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </NavigationPrompt>

        {nextStep ? (
          nextLocation ? (
            <Redirect to={nextLocation} />
          ) : (
            <Redirect to="about" />
          )
        ) : null}
      </div>
    );
  }

  handleFormEdit = value => {
    this.setState({ isEdited: value });
  };

  change = values => {
    const data = this.props.collectBillingData(values);
    this.props.calculatePagePercent("billingPercent", data);
  };

  submit = values => {
    if (!values.hasOwnProperty("billing_type")) {
      values.billing_type = 0;
    }
    this.props.updateClientBilling(values, () => {
      this.setState({
        nextStep: true
      });

      run(0)();
    });
  };
}

export default connect(
  ({ industries, clientData }) => ({ industries, clientData }),
  { getIndustries, showClientData, updateClientBilling }
)(ClientBilling);
