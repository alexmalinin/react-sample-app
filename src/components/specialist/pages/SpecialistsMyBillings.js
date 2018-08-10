import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  updateSpecialistBillings,
  showSpecialistData
} from "../../../actions/actions";
import { run } from "../../../helpers/scrollToElement";
import SpecialistBillingForm from "../forms/SpecialistBillingForm";
import { getAllUrlParams } from "../../../helpers/functions";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmationModal from "../../modals/ConfirmationModal";

class SpecialistsMyBillings extends Component {
  constructor() {
    super();

    this.state = {
      nextStep: false,
      isEditing: false,
      nextLocation: false,
      isEdited: false
    };
  }

  clearLocation = () => {
    this.setState({
      nextLocation: false
    });
  };

  componentWillMount() {
    this.props.showSpecialistData();

    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  render() {
    const { isEdited, isEditing, nextStep, nextLocation } = this.state;

    return (
      <div>
        <SpecialistBillingForm
          swichTab={this.swichTab}
          data={this.props.specialistData}
          isEditing={isEditing}
          handleFormEdit={this.handleFormEdit}
          onChange={this.change}
          onSubmit={this.submit}
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
              formId="SpecialistBillingForm"
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
    this.props.updateSpecialistBillings(values, () => {
      this.setState({
        nextStep: true
      });

      run(0)();
    });
  };
}

export default connect(({ specialistData }) => ({ specialistData }), {
  updateSpecialistBillings,
  showSpecialistData
})(SpecialistsMyBillings);
